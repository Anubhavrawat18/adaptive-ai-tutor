import { Router } from "express";

import {
  getCurrentUser,
  updateCurrentUser,
  deleteCurrentUser,
} from "./user.controller.js";

import { authenticate } from "../../middleware/auth.middleware.js";

const router = Router();

router.use(authenticate);

router.get("/me", getCurrentUser);
router.patch("/me", updateCurrentUser);
router.delete("/me", deleteCurrentUser);

export default router;
