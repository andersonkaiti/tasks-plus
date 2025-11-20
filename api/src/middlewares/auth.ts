import type { FastifyInstance } from 'fastify'
import fastifyPlugin from 'fastify-plugin'
import { UnauthorizedError } from '../routes/_errors/unauthorized-error'

export const authMiddleware = fastifyPlugin(async (app: FastifyInstance) => {
  app.addHook('preHandler', async (request) => {
    try {
      const { sub } = await request.jwtVerify<{ sub: string }>()

      request.getAuthenticatedUserId = async () => {
        return sub
      }
    } catch {
      throw new UnauthorizedError('Invalid token')
    }
  })
})
