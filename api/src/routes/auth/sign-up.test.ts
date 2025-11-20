import { faker } from '@faker-js/faker'
import { beforeAll, describe, expect, it } from 'vitest'
import { app } from '../../app'

describe('Sign up', () => {
  beforeAll(async () => {
    await app.ready()
  })

  it('[POST] /sign-up should create a user and return status 201', async () => {
    const email = faker.internet.email()
    const password = faker.internet.password()
    const username = faker.person.fullName()

    const response = await app.inject({
      method: 'POST',
      url: '/sign-up',
      payload: {
        username,
        email,
        password,
        confirmPassword: password,
      },
    })

    expect(response.statusCode).toBe(201)
  })

  it('[POST] /sign-up should fail with duplicate email', async () => {
    const email = faker.internet.email()
    const password = faker.internet.password()
    const username1 = faker.person.fullName()
    const username2 = faker.person.fullName()

    await app.inject({
      method: 'POST',
      url: '/sign-up',
      payload: {
        username: username1,
        email,
        password,
        confirmPassword: password,
      },
    })

    const response = await app.inject({
      method: 'POST',
      url: '/sign-up',
      payload: {
        username: username2,
        email,
        password,
        confirmPassword: password,
      },
    })

    expect(response.statusCode).toEqual(409)
  })
})
