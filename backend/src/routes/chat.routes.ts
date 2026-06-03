import { Router } from "express";
import { ChatController } from "../controllers/chat.controller.js";

export const chatRouter = Router();

// POST /api/chat — Send a message to the AI assistant
chatRouter.post("/", ChatController.sendMessage);

// GET /api/chat/:sessionId — Get chat history for a session
chatRouter.get("/:sessionId", ChatController.getHistory);
