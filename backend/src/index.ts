import express from "express";
import cors from "cors";
import { env } from "./config/env.js";
import { authRouter } from "./routes/auth.routes.js";
import { catalogRouter } from "./routes/catalog.routes.js";
import { cartRouter } from "./routes/cart.routes.js";
import { chatRouter } from "./routes/chat.routes.js";
import { errorMiddleware } from "./middlewares/error.middleware.js";

const app = express();

// ── Global Middleware ────────────────────────────────────────
app.use(
  cors({
    origin: env.FRONTEND_URL,
    credentials: true,
  })
);
app.use(express.json());

// ── Health Check ─────────────────────────────────────────────
app.get("/api/health", (_req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

// ── API Routes ───────────────────────────────────────────────
app.use("/api/auth", authRouter);
app.use("/api/catalog", catalogRouter);
app.use("/api/cart", cartRouter);
app.use("/api/chat", chatRouter);

// ── Error Handler (must be last) ─────────────────────────────
app.use(errorMiddleware);

// ── Start Server ─────────────────────────────────────────────
app.listen(env.PORT, () => {
  console.log(
    `🚀 Vera Sync API running at http://localhost:${env.PORT} [${env.NODE_ENV}]`
  );
});

export default app;
