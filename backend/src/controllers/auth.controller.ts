import type { Request, Response, NextFunction } from "express";

/**
 * AuthController
 * Handles user registration, login, and profile retrieval.
 * Implementation will be added in Step 2.
 */
export class AuthController {
  static async register(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      // TODO: Implement user registration with hashed password
      res.status(501).json({ message: "Not implemented yet" });
    } catch (error) {
      next(error);
    }
  }

  static async login(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      // TODO: Implement login with JWT token generation
      res.status(501).json({ message: "Not implemented yet" });
    } catch (error) {
      next(error);
    }
  }

  static async me(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      // TODO: Implement profile retrieval from JWT token
      res.status(501).json({ message: "Not implemented yet" });
    } catch (error) {
      next(error);
    }
  }
}
