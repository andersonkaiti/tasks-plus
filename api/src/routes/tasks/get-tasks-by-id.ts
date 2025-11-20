import { eq } from 'drizzle-orm'
import { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { z } from 'zod'
import { db } from '../../database'
import { tasksTable } from '../../database/schemas'
import { authMiddleware } from '../../middlewares/auth'
import { NotFoundError } from '../_errors/not-found'

export const getTaskById: FastifyPluginAsyncZod = async (app) => {
  await app.register(authMiddleware)

  app.get(
    '/tasks/:id',
    {
      schema: {
        summary: 'Get task by id',
        tags: ['Tasks'],
        security: [{ bearerAuth: [] }],
        params: z.object({
          id: z.uuid(),
        }),
        response: {
          200: z.object({
            id: z.string(),
            title: z.string(),
            description: z.string().nullable(),
            authorId: z.string(),
            completed: z.boolean(),
            dueDate: z.date().nullable(),
            createdAt: z.date(),
            updatedAt: z.date(),
          }),
          404: z.object({
            message: z.string(),
          }),
          500: z.object({
            message: z.string(),
          }),
        },
      },
    },
    async (request, reply) => {
      const { id } = request.params

      const [task] = await db
        .select()
        .from(tasksTable)
        .where(eq(tasksTable.id, id))

      if (!task) {
        throw new NotFoundError('Task not found')
      }

      return reply.status(200).send(task)
    },
  )
}
