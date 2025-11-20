import { eq } from 'drizzle-orm'
import { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { z } from 'zod'
import { db } from '../../database'
import { tasksTable } from '../../database/schemas'
import { authMiddleware } from '../../middlewares/auth'
import { NotFoundError } from '../_errors/not-found'

export const updateTask: FastifyPluginAsyncZod = async (app) => {
  await app.register(authMiddleware)

  app.put(
    '/tasks/:id',
    {
      schema: {
        summary: 'Update a task',
        tags: ['Tasks'],
        security: [{ bearerAuth: [] }],
        params: z.object({
          id: z.string(),
        }),
        body: z.object({
          title: z.string().optional(),
          description: z.string().optional(),
          completed: z.boolean().optional(),
          dueDate: z.coerce.date().optional().nullable(),
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

      const data = request.body

      const [task] = await db
        .select()
        .from(tasksTable)
        .where(eq(tasksTable.id, id))

      if (!task) {
        throw new NotFoundError('Task not found')
      }

      await db
        .update(tasksTable)
        .set({
          ...data,
          updatedAt: new Date(),
        })
        .where(eq(tasksTable.id, id))

      return reply.status(200).send()
    },
  )
}
