import type { Request, Response, NextFunction } from "express";

/**
 * Authentication Middleware
 * Validates NextAuth JWT tokens on protected Express routes.
 * Implementation will be added in Step 2.
 */
export const authMiddleware = async (
  req: Request,
  _res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    // TODO: Extract Bearer token from Authorization header
    // TODO: Verify token using NEXTAUTH_SECRET
    // TODO: Attach user info to req (e.g., req.user)
    next();
  } catch (error) {
    next(error);
  }
};

/**
 * Role-based access control middleware factory.
 * Usage: requireRole("SUPPLIER") or requireRole("BUYER", "ADMIN")
 */
export const requireRole = (...roles: string[]) => {
  return async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    // TODO: Check req.user.role against allowed roles
    // TODO: Return 403 if unauthorized
    next();
  };
};
