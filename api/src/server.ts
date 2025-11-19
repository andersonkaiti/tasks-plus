import { fastifyCors } from '@fastify/cors'
import fastifySwaggerJwt from '@fastify/jwt'
import { fastifySwagger } from '@fastify/swagger'
import scalarApiReference from '@scalar/fastify-api-reference'
import { fastify } from 'fastify'
import {
  type ZodTypeProvider,
  serializerCompiler,
  validatorCompiler,
} from 'fastify-type-provider-zod'
import { env } from './config/env'
import { errorHandler } from './error-handler'
import { signIn } from './routes/auth/sign-in'
import { signUp } from './routes/auth/sign-up'
import { createTask } from './routes/tasks/create-task'
import { getTasks } from './routes/tasks/get-tasks'
import { getTaskById } from './routes/tasks/get-tasks-by-id'
import { updateTask } from './routes/tasks/update-task'

const app = fastify().withTypeProvider<ZodTypeProvider>()

app.setValidatorCompiler(validatorCompiler)
app.setSerializerCompiler(serializerCompiler)

app.setErrorHandler(errorHandler)

app.register(fastifySwagger, {
  openapi: {
    info: {
      title: 'Tasks Plus API',
      description: 'API documentation for the Tasks Plus application',
      version: '1.0.0',
    },
  },
})

app.register(scalarApiReference, {
  routePrefix: '/docs',
  configuration: {
    theme: 'kepler',
  },
})

app.register(fastifyCors, {
  origin: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
})

app.register(fastifySwaggerJwt, {
  secret: env.JWT_SECRET,
})

app.register(signUp)
app.register(signIn)

app.register(createTask)
app.register(getTasks)
app.register(getTaskById)
app.register(updateTask)

app
  .listen({
    port: env.PORT,
    host: '0.0.0.0',
  })
  .then(() => {
    console.log(`🚀 Server running on port ${env.PORT}.`)
  })
