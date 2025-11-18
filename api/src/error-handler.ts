import type { FastifyInstance } from 'fastify'
import z, { ZodError } from 'zod'
import { ConflictError } from './routes/_errors/conflict-error'

type FastifyErrorHandler = FastifyInstance['errorHandler']

export const errorHandler: FastifyErrorHandler = (error, request, reply) => {
  if (error instanceof ZodError) {
    return reply.status(400).send({
      message: 'Validation error',
      error: z.treeifyError(error),
    })
  }

  if (error instanceof ConflictError) {
    return reply.status(400).send(409).send({
      message: error.message,
    })
  }

  return reply.status(500).send({
    message: 'Internal server error',
  })
}
