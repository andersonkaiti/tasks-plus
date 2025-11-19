import { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { z } from 'zod'
import { db } from '../../database'
import { tasksTable } from '../../database/schemas'
import { authMiddleware } from '../../middlewares/auth'

export const getTasks: FastifyPluginAsyncZod = async (app) => {
  app.register(authMiddleware).get(
    '/tasks',
    {
      schema: {
        summary: 'Get all tasks',
        tags: ['Tasks'],
        querystring: z.object({
          page: z.coerce.number().min(1).default(1),
          limit: z.coerce.number().min(1).default(10),
        }),
        response: {
          200: z.object({
            page: z.number(),
            limit: z.number(),
            totalPages: z.number(),
            tasks: z.array(
              z.object({
                id: z.string(),
                title: z.string(),
                description: z.string().nullable(),
                authorId: z.string(),
                completed: z.boolean(),
                dueDate: z.date().nullable(),
                createdAt: z.date(),
                updatedAt: z.date(),
              }),
            ),
          }),
          500: z.object({
            message: z.string(),
          }),
        },
      },
    },
    async (request, reply) => {
      const { page, limit } = request.query

      const offset = limit * page - limit

      const tasks = await db
        .select()
        .from(tasksTable)
        .offset(offset)
        .limit(limit)

      const totalNumberOfTasks = await db.$count(tasksTable)

      const totalPages = Math.ceil(totalNumberOfTasks / limit)

      return reply.status(200).send({
        page,
        limit,
        totalPages,
        tasks,
      })
    },
  )
}
