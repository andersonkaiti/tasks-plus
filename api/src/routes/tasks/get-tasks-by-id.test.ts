import { faker } from '@faker-js/faker'
import { beforeAll, describe, expect, it } from 'vitest'
import { app } from '../../app'

describe('Get task by id', () => {
  beforeAll(async () => {
    await app.ready()
  })

  it('[GET] /tasks/:id with valid id and token should return the task', async () => {
    const email = 'testuser@example.com'
    const password = 'testpassword123'

    await app.inject({
      method: 'POST',
      url: '/sign-up',
      payload: {
        username: 'Test User',
        email,
        password,
        confirmPassword: password,
      },
      headers: {
        'Content-Type': 'application/json',
      },
    })

    const signInResponse = await app.inject({
      method: 'POST',
      url: '/sign-in',
      payload: {
        email,
        password,
      },
      headers: {
        'Content-Type': 'application/json',
      },
    })

    const { token } = signInResponse.json()

    const createTaskResponse = await app.inject({
      method: 'POST',
      url: '/tasks',
      payload: {
        title: 'Task title',
        description: 'Task description',
        completed: false,
        dueDate: new Date().toISOString(),
      },
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    })

    const { task } = createTaskResponse.json()

    const response = await app.inject({
      method: 'GET',
      url: `/tasks/${task.id}`,
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    })

    expect(response.statusCode).toBe(200)
    expect(response.json()).toMatchObject({
      id: task.id,
      title: expect.any(String),
      description: expect.any(String),
      authorId: expect.any(String),
      completed: expect.any(Boolean),
      dueDate: expect.any(String),
      createdAt: expect.any(String),
      updatedAt: expect.any(String),
    })
  })

  it('[GET] /tasks/:id should return 404 when task not found', async () => {
    const email = 'notfounduser@example.com'
    const password = 'password123'

    await app.inject({
      method: 'POST',
      url: '/sign-up',
      payload: {
        username: 'Not Found User',
        email,
        password,
        confirmPassword: password,
      },
      headers: {
        'Content-Type': 'application/json',
      },
    })

    const signInResponse = await app.inject({
      method: 'POST',
      url: '/sign-in',
      payload: {
        email,
        password,
      },
      headers: {
        'Content-Type': 'application/json',
      },
    })

    const { token } = signInResponse.json()

    const someFakeId = faker.string.uuid()

    const response = await app.inject({
      method: 'GET',
      url: `/tasks/${someFakeId}`,
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    })

    expect(response.statusCode).toBe(404)
    expect(response.json()).toHaveProperty('message')
  })

  it('[GET] /tasks/:id should return 401 when authorization is missing', async () => {
    const email = 'unauthuser@example.com'
    const password = 'password123'

    await app.inject({
      method: 'POST',
      url: '/sign-up',
      payload: {
        username: 'Unauth User',
        email,
        password,
        confirmPassword: password,
      },
      headers: {
        'Content-Type': 'application/json',
      },
    })

    const signInResponse = await app.inject({
      method: 'POST',
      url: '/sign-in',
      payload: {
        email,
        password,
      },
      headers: {
        'Content-Type': 'application/json',
      },
    })

    const { token } = signInResponse.json()

    const createTaskResponse = await app.inject({
      method: 'POST',
      url: '/tasks',
      payload: {
        title: 'Some task',
        description: 'desc',
        completed: false,
        dueDate: new Date().toISOString(),
      },
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    })

    const { task } = createTaskResponse.json()

    const response = await app.inject({
      method: 'GET',
      url: `/tasks/${task.id}`,
      headers: {
        'Content-Type': 'application/json',
      },
    })

    expect(response.statusCode).toBe(401)
  })
})
