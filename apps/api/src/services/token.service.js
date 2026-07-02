import crypto from "crypto";

import { createRefreshToken } from "../repositories/refreshToken.repository.js";

import { generateAccessToken, generateRefreshToken } from "../utils/jwt.js";

import { REFRESH_TOKEN_EXPIRY_MS } from "../constants/auth.constants.js";

const hashToken = (token) => {
  return crypto.createHash("sha256").update(token).digest("hex");
};

export const issueTokens = async (user) => {
  const accessToken = generateAccessToken(user);
  const refreshToken = generateRefreshToken(user);

  await createRefreshToken({
    userId: user.id,
    tokenHash: hashToken(refreshToken),
    expiresAt: new Date(Date.now() + REFRESH_TOKEN_EXPIRY_MS),
  });

  return {
    accessToken,
    refreshToken,
  };
};

export const hashRefreshToken = hashToken;
