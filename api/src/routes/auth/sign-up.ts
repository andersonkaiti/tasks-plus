import { hash } from 'bcryptjs'
import { eq } from 'drizzle-orm'
import { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { z } from 'zod'
import { db } from '../../database/index'
import { usersTable } from '../../database/schemas'
import { ConflictError } from '../_errors/conflict-error'

export const signUp: FastifyPluginAsyncZod = async (app) => {
  app.post(
    '/sign-up',
    {
      schema: {
        summary: 'Create an account',
        tags: ['Authentication'],
        body: z
          .object({
            username: z.string(),
            email: z.email(),
            password: z.string(),
            confirmPassword: z.string(),
          })
          .refine(
            ({ password, confirmPassword }) => password === confirmPassword,
            {
              message: "Passwords don't match",
              path: ['password_confirmation'],
            },
          ),
        response: {
          201: z.object({
            user: z.object({
              id: z.string(),
              username: z.string(),
              email: z.string(),
              password: z.string(),
              createdAt: z.date(),
              updatedAt: z.date(),
            }),
          }),
          400: z.object({
            message: z.string(),
          }),
          409: z.object({
            message: z.string(),
          }),
          500: z.object({
            message: z.string(),
          }),
        },
      },
    },
    async (request, reply) => {
      const { password, email, ...rest } = request.body

      const userWithSameEmail = await db
        .select()
        .from(usersTable)
        .where(eq(usersTable.email, email))

      if (userWithSameEmail.length) {
        throw new ConflictError('Invalid credentials')
      }

      const hashedPassword = await hash(password, 6)

      const [user] = await db
        .insert(usersTable)
        .values({
          password: hashedPassword,
          email,
          ...rest,
        })
        .returning()

      return reply.status(201).send({
        user,
      })
    },
  )
}
