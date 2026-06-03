import type { Request, Response, NextFunction } from "express";

/**
 * CatalogController
 * Handles CRUD operations for leather listings.
 * Implementation will be added in Step 2.
 */
export class CatalogController {
  static async list(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      // TODO: Implement leather listing with filtering (origin, color, finish, price range)
      res.status(501).json({ message: "Not implemented yet" });
    } catch (error) {
      next(error);
    }
  }

  static async getById(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      // TODO: Implement single leather retrieval by ID
      res.status(501).json({ message: "Not implemented yet" });
    } catch (error) {
      next(error);
    }
  }

  static async create(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      // TODO: Implement leather creation (supplier role required)
      res.status(501).json({ message: "Not implemented yet" });
    } catch (error) {
      next(error);
    }
  }

  static async update(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      // TODO: Implement leather update (supplier role required, must own listing)
      res.status(501).json({ message: "Not implemented yet" });
    } catch (error) {
      next(error);
    }
  }

  static async remove(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      // TODO: Implement leather deletion (supplier role required, must own listing)
      res.status(501).json({ message: "Not implemented yet" });
    } catch (error) {
      next(error);
    }
  }
}
