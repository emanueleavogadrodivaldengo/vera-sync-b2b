// ─────────────────────────────────────────────────────────────
// Vera Sync — Prisma Client (Frontend Singleton)
// Used by Next.js Server Components for direct database access.
// Prevents multiple instances during development hot reload.
// ─────────────────────────────────────────────────────────────

import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma = globalForPrisma.prisma ?? new PrismaClient();

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
