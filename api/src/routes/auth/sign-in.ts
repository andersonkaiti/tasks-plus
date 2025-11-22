import { compare } from 'bcryptjs'
import { eq } from 'drizzle-orm'
import { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { z } from 'zod'
import { db } from '../../database'
import { usersTable } from '../../database/schemas'
import { BadRequestError } from '../_errors/badrequest-error'

export const signIn: FastifyPluginAsyncZod = async (app) => {
  app.post(
    '/sign-in',
    {
      schema: {
        summary: 'Sign in',
        tags: ['Authentication'],
        body: z.object({
          email: z.email(),
          password: z.string(),
        }),
        response: {
          200: z.object({
            token: z.string(),
          }),
          400: z.object({
            message: z.string(),
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
      const { password, email, ...rest } = request.body

      const [userFromEmail] = await db
        .select()
        .from(usersTable)
        .where(eq(usersTable.email, email))

      if (!userFromEmail) {
        throw new BadRequestError('Invalid credentials')
      }

      const isPasswordValid = await compare(password, userFromEmail.password)

      if (!isPasswordValid) {
        throw new BadRequestError('Invalid credentials')
      }

      const token = await reply.jwtSign(
        {
          sub: userFromEmail.id,
        },
        {
          sign: {
            expiresIn: '7d',
          },
        },
      )

      return reply.status(200).send({
        token,
      })
    },
  )
}
