import { faker } from '@faker-js/faker'
import request from 'supertest'
import { beforeAll, describe, expect, it } from 'vitest'
import { app } from '../../app'

describe('Sign in', () => {
  beforeAll(async () => {
    await app.ready()
  })

  it('[POST] /sign-in should return a valid token upon successful login', async () => {
    const email = faker.internet.email()
    const password = faker.internet.password()

    await request(app.server)
      .post('/sign-up')
      .set('Content-Type', 'application/json')
      .send({
        username: faker.person.fullName(),
        email,
        password,
        confirmPassword: password,
      })

    await request(app.server)
      .post('/sign-in')
      .set('Content-Type', 'application/json')
      .send({
        email,
        password,
      })

    const response = await app.inject({
      method: 'POST',
      url: '/sign-in',
      body: {
        email,
        password,
      },
    })

    expect(response.statusCode).toEqual(200)
  })

  it('[POST] /sign-in should fail with wrong password', async () => {
    const email = faker.internet.email()
    const password = faker.internet.password()

    await request(app.server)
      .post('/sign-up')
      .set('Content-Type', 'application/json')
      .send({
        username: faker.person.fullName(),
        email,
        password,
        confirmPassword: password,
      })

    const response = await app.inject({
      method: 'POST',
      url: '/sign-in',
      body: {
        email,
        password: 'wrongpassword',
      },
    })

    expect(response.statusCode).toBe(400)
  })
})
