import dotenv from "dotenv";
import { z } from "zod";

dotenv.config();

// Validate environment variables at startup using Zod
const envSchema = z.object({
  PORT: z.coerce.number().default(4000),
  NODE_ENV: z
    .enum(["development", "production", "test"])
    .default("development"),
  DATABASE_URL: z.string().url(),
  NEXTAUTH_SECRET: z.string().min(1),
  OPENAI_API_KEY: z.string().min(1),
  WHATSAPP_PHONE_NUMBER: z.string().min(1),
  FRONTEND_URL: z.string().url().default("http://localhost:3000"),
});

const parsed = envSchema.safeParse(process.env);

if (!parsed.success) {
  console.error(
    "❌ Invalid environment variables:",
    parsed.error.flatten().fieldErrors
  );
  process.exit(1);
}

export const env = parsed.data;
