import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import cookieParser from "cookie-parser";

import authRoutes from "./modules/auth/auth.routes.js";
import userRoutes from "./modules/user/user.routes.js";

import { errorMiddleware } from "./middleware/error.middleware.js";

const app = express();

app.use(cors());
app.use(helmet());
app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("API Running");
});

// make use of routes
// AUTH ROUTES
app.use("/api/auth", authRoutes);
// USER ROUTES
app.use("/api/users", userRoutes);

app.use(errorMiddleware);

export default app;
