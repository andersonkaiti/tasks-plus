import { faker } from '@faker-js/faker'
import { beforeAll, describe, expect, it } from 'vitest'
import { app } from '../../app'

describe('Create task', () => {
  beforeAll(async () => {
    await app.ready()
  })

  it('[POST] /tasks should create a new task and return it', async () => {
    const email = faker.internet.email()
    const password = faker.internet.password()

    await app.inject({
      method: 'POST',
      url: '/sign-up',
      payload: {
        username: faker.person.fullName(),
        email,
        password,
        confirmPassword: password,
      },
    })

    const signInResponse = await app.inject({
      method: 'POST',
      url: '/sign-in',
      payload: { email, password },
    })
    const { token } = signInResponse.json()

    const payload = {
      title: faker.lorem.words(5),
      description: faker.lorem.paragraph(),
      completed: faker.datatype.boolean(),
      dueDate: faker.date.anytime().toISOString(),
    }

    const response = await app.inject({
      method: 'POST',
      url: '/tasks',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      payload,
    })

    expect(response.statusCode).toBe(201)
    expect(response.json()).toMatchObject({
      task: {
        id: expect.any(String),
        title: payload.title,
        description: payload.description,
        completed: payload.completed,
        dueDate: expect.any(String),
        authorId: expect.any(String),
        createdAt: expect.any(String),
        updatedAt: expect.any(String),
      },
    })
  })

  it('[POST] /tasks should not allow unauthenticated users to create a task', async () => {
    const payload = {
      title: faker.lorem.words(5),
      description: faker.lorem.paragraph(),
      completed: faker.datatype.boolean(),
      dueDate: faker.date.anytime().toISOString(),
    }

    const response = await app.inject({
      method: 'POST',
      url: '/tasks',
      headers: {
        'Content-Type': 'application/json',
      },
      payload,
    })

    expect(response.statusCode).toBe(401)
  })
})
