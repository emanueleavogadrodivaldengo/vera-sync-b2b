import type { Request, Response, NextFunction } from "express";

/**
 * Global error handling middleware.
 * Catches all unhandled errors and returns a consistent JSON response.
 */
export const errorMiddleware = (
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
): void => {
  console.error(`[ERROR] ${err.message}`, err.stack);

  const statusCode = (err as any).statusCode || 500;
  const message =
    process.env.NODE_ENV === "production"
      ? "Internal server error"
      : err.message;

  res.status(statusCode).json({
    error: {
      message,
      ...(process.env.NODE_ENV !== "production" && { stack: err.stack }),
    },
  });
};
