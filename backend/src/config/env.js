import dotenv from 'dotenv'
import { z } from 'zod'

dotenv.config()

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  PORT: z.string().default('5000'),
  MONGODB_URI: z.string().optional(),
  JWT_SECRET: z.string().optional(),
  JWT_EXPIRES_IN: z.string().default('7d'),
  CLIENT_URL: z.string().url().default('http://localhost:5173'),
  CLOUDINARY_CLOUD_NAME: z.string().optional(),
  CLOUDINARY_API_KEY: z.string().optional(),
  CLOUDINARY_API_SECRET: z.string().optional(),
})

const parsed = envSchema.parse(process.env)

const env = {
  NODE_ENV: parsed.NODE_ENV,
  PORT: Number(parsed.PORT),
  MONGODB_URI: parsed.MONGODB_URI ?? '',
  JWT_SECRET: parsed.JWT_SECRET ?? (parsed.NODE_ENV === 'test' ? 'testsecret' : ''),
  JWT_EXPIRES_IN: parsed.JWT_EXPIRES_IN,
  CLIENT_URL: parsed.CLIENT_URL,
  CLOUDINARY_CLOUD_NAME: parsed.CLOUDINARY_CLOUD_NAME,
  CLOUDINARY_API_KEY: parsed.CLOUDINARY_API_KEY,
  CLOUDINARY_API_SECRET: parsed.CLOUDINARY_API_SECRET,
}

if (env.NODE_ENV !== 'test') {
  const required = [
    { key: 'MONGODB_URI', value: env.MONGODB_URI, message: 'MONGODB_URI is required in development and production' },
    { key: 'JWT_SECRET', value: env.JWT_SECRET, message: 'JWT_SECRET is required in development and production' },
  ]

  required.forEach(({ value, message }) => {
    if (!value) {
      throw new Error(`Environment validation error: ${message}`)
    }
  })
}

export default env
