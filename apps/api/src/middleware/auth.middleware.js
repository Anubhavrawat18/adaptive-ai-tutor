// jwt protection middleware
// Authorization Header
//         ↓
// Verify Access Token
//         ↓
// Attach req.user
//         ↓
// next()

// the middleware functions as:
// reads header -> extracts token -> verifies JWT -> stores payload in req.user -> calls next()
// after this: req.user.userId and req.user.email are available everywhere

import { verifyAccessToken } from "../utils/jwt.js";
import { ApiError } from "../utils/ApiError.js";

export const authenticate = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    throw new ApiError(401, "Authentication header missing.");
  }

  const [scheme, token] = authHeader.split(" ");

  if (scheme !== "Bearer" || !token) {
    throw new ApiError(401, "Invalid or expire access token.");
  }

  // if valid then set req.user = payload and pass to next funnction

  try {
    const payload = verifyAccessToken(token);
    req.user = payload;
    next();
  } catch {
    throw new ApiError(401, "Invalid or expired access token.");
  }
};
