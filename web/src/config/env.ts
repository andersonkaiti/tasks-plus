import { createEnv } from '@t3-oss/env-core'
import { z } from 'zod'

export const env = createEnv({
  clientPrefix: 'VITE_PUBLIC_',
  client: {
    VITE_PUBLIC_API_URL: z.url(),
    VITE_PUBLIC_BASE_URL: z.url(),
  },
  runtimeEnv: import.meta.env,
})
