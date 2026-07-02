import crypto from "crypto";

import { createUserWithAccount } from "../repositories/auth.repository.js";

import {
  findUserById,
  findUserByEmail,
} from "../repositories/user.repository.js";

import {
  createRefreshToken,
  findRefreshToken,
  deleteRefreshToken,
  deleteUserRefreshTokens,
} from "../repositories/refreshToken.repository.js";

import { hashPassword, comparePassword } from "../utils/hash.js";

import {
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
} from "../utils/jwt.js";

import { ApiError } from "../utils/ApiError.js";

import { createGoogleUserWithAccount } from "../repositories/auth.repository.js";

import { findAccount } from "../repositories/account.repository.js";

import {
  AUTH_PROVIDER,
  REFRESH_TOKEN_EXPIRY_MS,
} from "../constants/auth.constants.js";

import { issueTokens, hashRefreshToken } from "./token.service.js";

const sanitizeUser = (user) => {
  const { passwordHash, ...safeUser } = user;
  return safeUser;
};

// email-password Auth
export const register = async ({ email, password, name }) => {
  const existingUser = await findUserByEmail(email);

  if (existingUser) {
    throw new ApiError(409, "User already exists");
  }

  const passwordHash = await hashPassword(password);

  const user = await createUserWithAccount({
    email,
    passwordHash,
    name,
    provider: AUTH_PROVIDER.CREDENTIALS,
    providerAccountId: email,
  });

  const { accessToken, refreshToken } = await issueTokens(user);

  return {
    user: sanitizeUser(user),
    accessToken,
    refreshToken,
  };
};

export const login = async ({ email, password }) => {
  const user = await findUserByEmail(email);

  if (!user) {
    throw new ApiError(401, "Invalid credentials");
  }

  if (!user.passwordHash) {
    throw new ApiError(400, "This account uses OAuth authentication");
  }

  const isPasswordValid = await comparePassword(password, user.passwordHash);

  if (!isPasswordValid) {
    throw new ApiError(401, "Invalid credentials");
  }

  const { accessToken, refreshToken } = await issueTokens(user);

  return {
    user: sanitizeUser(user),
    accessToken,
    refreshToken,
  };
};

export const refreshAccessToken = async (refreshToken) => {
  let payload;

  try {
    payload = verifyRefreshToken(refreshToken);
  } catch {
    throw new ApiError(401, "Invalid refresh token");
  }

  const tokenHash = hashRefreshToken(refreshToken);

  const storedToken = await findRefreshToken(tokenHash);

  if (!storedToken) {
    throw new ApiError(401, "Invalid refresh token");
  }

  if (storedToken.expiresAt < new Date()) {
    await deleteRefreshToken(tokenHash);

    throw new ApiError(401, "Refresh token expired");
  }

  const user = await findUserById(payload.userId);

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  await deleteRefreshToken(tokenHash);

  return await issueTokens(user);
};

export const logout = async (userId) => {
  await deleteUserRefreshTokens(userId);

  return {
    message: "Logged out successfully",
  };
};

// Google OAuth
export const googleLogin = async (profile) => {
  const googleId = profile.id;

  const email = profile.emails?.[0]?.value;
  const name = profile.displayName;
  const avatarUrl = profile.photos?.[0]?.value;

  let account = await findAccount("GOOGLE", googleId);

  let user;

  if (account) {
    user = account.user;
  } else {
    user = await createGoogleUserWithAccount({
      email,
      name,
      avatarUrl,
      providerAccountId: googleId,
    });
  }

  const { accessToken, refreshToken } = await issueTokens(user);

  return {
    user: sanitizeUser(user),
    accessToken,
    refreshToken,
  };
};
