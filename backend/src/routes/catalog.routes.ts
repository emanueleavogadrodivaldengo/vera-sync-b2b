import { Router } from "express";
import { CatalogController } from "../controllers/catalog.controller.js";

export const catalogRouter = Router();

// GET /api/catalog — List all leathers with filtering
catalogRouter.get("/", CatalogController.list);

// GET /api/catalog/:id — Get a single leather by ID
catalogRouter.get("/:id", CatalogController.getById);

// POST /api/catalog — Create a new leather listing (supplier only)
catalogRouter.post("/", CatalogController.create);

// PUT /api/catalog/:id — Update a leather listing (supplier only)
catalogRouter.put("/:id", CatalogController.update);

// DELETE /api/catalog/:id — Remove a leather listing (supplier only)
catalogRouter.delete("/:id", CatalogController.remove);
