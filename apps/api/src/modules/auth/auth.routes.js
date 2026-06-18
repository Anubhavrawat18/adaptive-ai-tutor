import { Router } from "express";

import { register, login, refreshToken, logout } from "./auth.controller.js";

import { authenticate } from "../../middleware/auth.middleware.js";

const router = Router();

router.post("/register", register);
router.post("/login", login);
router.post("/refresh", refreshToken);
router.post("/logout", authenticate, logout);

export default router;
