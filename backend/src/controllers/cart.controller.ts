import type { Request, Response, NextFunction } from "express";

/**
 * CartController
 * Handles cart operations and WhatsApp checkout.
 * Implementation will be added in Step 2.
 */
export class CartController {
  static async getCart(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      // TODO: Retrieve authenticated user's cart items with leather details
      res.status(501).json({ message: "Not implemented yet" });
    } catch (error) {
      next(error);
    }
  }

  static async addItem(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      // TODO: Add a leather to the user's cart (upsert on userId + leatherId)
      res.status(501).json({ message: "Not implemented yet" });
    } catch (error) {
      next(error);
    }
  }

  static async updateItem(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      // TODO: Update cart item quantity or notes
      res.status(501).json({ message: "Not implemented yet" });
    } catch (error) {
      next(error);
    }
  }

  static async removeItem(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      // TODO: Remove item from cart
      res.status(501).json({ message: "Not implemented yet" });
    } catch (error) {
      next(error);
    }
  }

  static async checkout(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      // TODO: Convert cart to SampleRequest, clear cart, generate WhatsApp link
      res.status(501).json({ message: "Not implemented yet" });
    } catch (error) {
      next(error);
    }
  }
}
