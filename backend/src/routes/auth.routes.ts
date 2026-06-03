import { Router } from "express";
import { AuthController } from "../controllers/auth.controller.js";

export const authRouter = Router();

// POST /api/auth/register — Create a new user account
authRouter.post("/register", AuthController.register);

// POST /api/auth/login — Authenticate and return token
authRouter.post("/login", AuthController.login);

// GET /api/auth/me — Get current user profile (requires auth)
authRouter.get("/me", AuthController.me);
