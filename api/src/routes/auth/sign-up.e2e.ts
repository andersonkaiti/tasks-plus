import { faker } from '@faker-js/faker'
import { eq } from 'drizzle-orm'
import request from 'supertest'
import { beforeAll, describe, expect, it } from 'vitest'
import { app } from '../../app'
import { db } from '../../database'
import { usersTable } from '../../database/schemas'

describe('Sign up', () => {
  beforeAll(async () => {
    await app.ready()
  })

  it('[POST] /sign-up', async () => {
    const email = faker.internet.email()
    const password = faker.internet.password()

    const response = await request(app.server)
      .post('/sign-up')
      .set('Content-Type', 'application/json')
      .send({
        username: faker.person.fullName(),
        email,
        password,
        confirmPassword: password,
      })

    expect(response.status).toEqual(201)

    const userOnDatabase = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.email, email))

    expect(userOnDatabase).toBeTruthy()
  })
})
