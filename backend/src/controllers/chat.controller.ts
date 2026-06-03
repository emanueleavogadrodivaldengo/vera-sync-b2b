import type { Request, Response, NextFunction } from "express";

/**
 * ChatController
 * Handles AI virtual assistant interactions via OpenAI.
 * Implementation will be added in Step 2.
 */
export class ChatController {
  static async sendMessage(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      // TODO: Send user message to OpenAI, store in ChatMessage, return response
      res.status(501).json({ message: "Not implemented yet" });
    } catch (error) {
      next(error);
    }
  }

  static async getHistory(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      // TODO: Retrieve chat history by sessionId
      res.status(501).json({ message: "Not implemented yet" });
    } catch (error) {
      next(error);
    }
  }
}
