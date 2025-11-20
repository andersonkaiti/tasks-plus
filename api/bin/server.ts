import { env } from '../src/config/env'
import { app } from '../src/app'

app
  .listen({
    port: env.PORT,
    host: '0.0.0.0',
  })
  .then(() => {
    console.log(`🚀 Server running on port ${env.PORT}.`)
  })
