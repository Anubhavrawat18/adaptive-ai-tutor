import crypto from "crypto";

import {
  findUserById,
  findUserByEmail,
  createUser,
} from "../repositories/user.repository.js";

import { createAccount } from "../repositories/account.repository.js";

import {
  createRefreshToken,
  findRefreshToken,
  deleteUserRefreshTokens,
} from "../repositories/refreshToken.repository.js";

import { hashPassword, comparePassword } from "../utils/hash.js";

import {
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
} from "../utils/jwt.js";

import { AUTH_PROVIDER } from "../constants/auth.constants.js";

const hashToken = (token) => {
  return crypto.createHash("sha256").update(token).digest("hex");
};

export const signup = async ({ email, password, name }) => {
  const existingUser = await findUserByEmail(email);

  if (existingUser) {
    throw new Error("User already exists");
  }

  const passwordHash = await hashPassword(password);

  const user = await createUser({
    email,
    passwordHash,
    name,
  });

  await createAccount({
    userId: user.id,
    provider: AUTH_PROVIDER.CREDENTIALS,
    providerAccountId: user.email,
  });

  const accessToken = generateAccessToken(user);
  const refreshToken = generateRefreshToken(user);

  await createRefreshToken({
    userId: user.id,
    tokenHash: hashToken(refreshToken),
    expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
  });

  return {
    user,
    accessToken,
    refreshToken,
  };
};

export const login = async ({ email, password }) => {
  const user = await findUserByEmail(email);

  if (!user) {
    throw new Error("Invalid credentials");
  }

  if (!user.passwordHash) {
    throw new Error("This account uses OAuth authentication");
  }

  const isPasswordValid = await comparePassword(password, user.passwordHash);

  if (!isPasswordValid) {
    throw new Error("Invalid credentials");
  }

  const accessToken = generateAccessToken(user);
  const refreshToken = generateRefreshToken(user);

  await createRefreshToken({
    userId: user.id,
    tokenHash: hashToken(refreshToken),
    expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
  });

  return {
    user,
    accessToken,
    refreshToken,
  };
};

export const refreshAccessToken = async (refreshToken) => {
  const payload = verifyRefreshToken(refreshToken);

  const tokenHash = hashToken(refreshToken);

  const storedToken = await findRefreshToken(tokenHash);

  if (!storedToken) {
    throw new Error("Invalid refresh token");
  }

  if (storedToken.expiresAt < new Date()) {
    throw new Error("Refresh token expired");
  }

  const user = await findUserById(payload.userId);

  if (!user) {
    throw new Error("User not found");
  }

  const accessToken = generateAccessToken(user);

  return {
    accessToken,
  };
};

export const logout = async (userId) => {
  await deleteUserRefreshTokens(userId);

  return {
    message: "Logged out successfully",
  };
};
