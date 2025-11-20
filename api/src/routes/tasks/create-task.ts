import { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { z } from 'zod'
import { db } from '../../database'
import { tasksTable } from '../../database/schemas'
import { authMiddleware } from '../../middlewares/auth'

export const createTask: FastifyPluginAsyncZod = async (app) => {
  await app.register(authMiddleware)

  app.post(
    '/tasks',
    {
      schema: {
        summary: 'Create a task',
        tags: ['Tasks'],
        security: [{ bearerAuth: [] }],
        body: z.object({
          title: z.string(),
          description: z.string().optional(),
          completed: z.boolean().optional(),
          dueDate: z.coerce.date().optional(),
        }),
        response: {
          201: z.object({
            task: z.object({
              id: z.string(),
              title: z.string(),
              description: z.string().nullable(),
              completed: z.boolean(),
              dueDate: z.date().nullable(),
              authorId: z.string(),
              createdAt: z.date(),
              updatedAt: z.date(),
            }),
          }),
          401: z.object({
            message: z.string(),
          }),
          500: z.object({
            message: z.string(),
          }),
        },
      },
    },
    async (request, reply) => {
      const authenticatedUserId = await request.getAuthenticatedUserId()

      const task = request.body

      const [createdTask] = await db
        .insert(tasksTable)
        .values({
          ...task,
          authorId: authenticatedUserId,
        })
        .returning()

      return reply.status(201).send({
        task: createdTask,
      })
    },
  )
}
