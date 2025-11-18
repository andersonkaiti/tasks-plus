import { defineConfig } from 'drizzle-kit'
import { env } from './src/config/env'

export default defineConfig({
  out: './src/database/migrations',
  schema: './src/database/schemas/**/*.ts',
  dialect: 'postgresql',
  dbCredentials: {
    url: env.DATABASE_URL,
  },
  casing: 'snake_case',
})
