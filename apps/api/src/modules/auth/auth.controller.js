import * as authService from "../../services/auth.service.js";
import {
  setRefreshTokenCookie,
  clearRefreshTokenCookie,
} from "../../utils/cookies.js";

export const register = async (req, res) => {
  const { user, accessToken, refreshToken } = await authService.register(
    req.body,
  );

  setRefreshTokenCookie(res, refreshToken);

  return res.status(201).json({
    success: true,
    data: {
      user,
      accessToken,
    },
  });
};

export const login = async (req, res) => {
  const { user, accessToken, refreshToken } = await authService.login(req.body);

  setRefreshTokenCookie(res, refreshToken);

  return res.status(200).json({
    success: true,
    data: {
      user,
      accessToken,
    },
  });
};

export const refreshToken = async (req, res) => {
  const token = req.cookies.refreshToken;

  const { accessToken, refreshToken: newRefreshToken } =
    await authService.refreshAccessToken(token);

  setRefreshTokenCookie(res, newRefreshToken);

  return res.status(200).json({
    success: true,
    data: {
      accessToken,
    },
  });
};

export const logout = async (req, res) => {
  await authService.logout(req.user.userId);

  clearRefreshTokenCookie(res);

  return res.status(200).json({
    success: true,
    message: "Logged out successfully",
  });
};
