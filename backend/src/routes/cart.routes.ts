import { Router } from "express";
import { CartController } from "../controllers/cart.controller.js";

export const cartRouter = Router();

// GET /api/cart — Get current user's cart items
cartRouter.get("/", CartController.getCart);

// POST /api/cart — Add item to cart
cartRouter.post("/", CartController.addItem);

// PUT /api/cart/:id — Update cart item quantity/notes
cartRouter.put("/:id", CartController.updateItem);

// DELETE /api/cart/:id — Remove item from cart
cartRouter.delete("/:id", CartController.removeItem);

// POST /api/cart/checkout — Convert cart to sample request + generate WhatsApp link
cartRouter.post("/checkout", CartController.checkout);
