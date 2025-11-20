import { faker } from '@faker-js/faker'
import fastify, { type FastifyInstance } from 'fastify'
import request from 'supertest'
import { beforeAll, describe, expect, it } from 'vitest'
import { signIn } from '../routes/auth/sign-in'
import { signUp } from '../routes/auth/sign-up'
import { authMiddleware } from './auth'
import {
  type ZodTypeProvider,
  serializerCompiler,
  validatorCompiler,
} from 'fastify-type-provider-zod'
import fastifyJwt from '@fastify/jwt'
import { env } from '../config/env'
import { errorHandler } from '../error-handler'

describe('Auth middleware', () => {
  let app: FastifyInstance

  beforeAll(async () => {
    app = fastify().withTypeProvider<ZodTypeProvider>()

    app.setSerializerCompiler(serializerCompiler)
    app.setValidatorCompiler(validatorCompiler)

    app.setErrorHandler(errorHandler)

    app.register(fastifyJwt, {
      secret: env.JWT_SECRET,
    })

    app.register(signUp)
    app.register(signIn)
    app.register(authMiddleware)

    app.get('/auth-middleware', async () => {
      return {
        message: 'ok',
      }
    })

    await app.ready()
  })

  it('should reject unauthorized requests (no token)', async () => {
    const response = await app.inject({
      method: 'GET',
      url: '/auth-middleware',
    })

    expect(response.statusCode).toEqual(401)
  })

  it('should reject requests with an invalid token', async () => {
    const response = await app.inject({
      method: 'GET',
      url: '/auth-middleware',
      headers: {
        Authorization: 'invalid token',
      },
    })

    expect(response.statusCode).toEqual(401)
  })

  it('should allow access with a valid token', async () => {
    const email = faker.internet.email()
    const password = faker.internet.password()

    await request(app.server)
      .post('/sign-up')
      .set('Content-Type', 'application/json')
      .send({
        username: faker.person.fullName(),
        email,
        password,
        confirmPassword: password,
      })

    const {
      body: { token },
    } = await request(app.server)
      .post('/sign-in')
      .set('Content-Type', 'application/json')
      .send({
        email,
        password,
      })

    const response = await app.inject({
      method: 'GET',
      url: '/auth-middleware',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    expect(response.statusCode).toEqual(401)
  })
})
