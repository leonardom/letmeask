import { z } from 'zod'

const envSchema = z.object({
  PORT: z.coerce.number().default(3333),
  CORS_ALLOW_ORIGIN: z.string().url(),
  DATABASE_URL: z.string().url(),
  GEMINI_API_KEY: z.string(),
});

export const env = envSchema.parse(process.env)