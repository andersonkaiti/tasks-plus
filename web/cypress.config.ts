import { defineConfig } from 'cypress'
import { env } from './src/config/env'

export default defineConfig({
  e2e: {
    baseUrl: env.VITE_PUBLIC_BASE_URL,
  },
})
