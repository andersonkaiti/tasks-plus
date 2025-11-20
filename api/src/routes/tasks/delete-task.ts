import { eq } from 'drizzle-orm'
import { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { z } from 'zod'
import { db } from '../../database'
import { tasksTable } from '../../database/schemas'
import { authMiddleware } from '../../middlewares/auth'
import { NotFoundError } from '../_errors/not-found'

export const deleteTask: FastifyPluginAsyncZod = async (app) => {
  await app.register(authMiddleware)

  app.delete(
    '/tasks/:id',
    {
      schema: {
        summary: 'Delete a task',
        tags: ['Tasks'],
        security: [{ bearerAuth: [] }],
        params: z.object({
          id: z.uuid(),
        }),
        response: {
          200: z.void(),
          401: z.object({
            message: z.string(),
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

      await db.delete(tasksTable).where(eq(tasksTable.id, id))

      return reply.status(200).send()
    },
  )
}
