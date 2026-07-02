import { Router } from "express";
import passport from "./passport.js";

import {
  register,
  login,
  refreshToken,
  logout,
  googleCallback,
} from "./auth.controller.js";

import { authenticate } from "../../middleware/auth.middleware.js";

const router = Router();

// email-password auth
router.post("/register", register);
router.post("/login", login);
router.post("/refresh", refreshToken);
router.post("/logout", authenticate, logout);

// Google OAuth
router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
    session: false,
  }),
);
router.get(
  "/google/callback",
  passport.authenticate("google", {
    session: false,
  }),
  googleCallback,
);

export default router;
