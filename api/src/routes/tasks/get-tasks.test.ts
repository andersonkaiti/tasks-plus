import { beforeAll, describe, expect, it } from 'vitest'
import { app } from '../../app'

describe('Get tasks', () => {
  beforeAll(async () => {
    await app.ready()
  })

  it('[GET] /tasks should return 401 if not authenticated', async () => {
    const response = await app.inject({
      method: 'GET',
      url: '/tasks',
      headers: {
        'Content-Type': 'application/json',
      },
    })

    expect(response.statusCode).toBe(401)
  })

  it('[GET] /tasks should return tasks if authenticated', async () => {
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

    for (let i = 0; i < 2; i++) {
      await app.inject({
        method: 'POST',
        url: '/tasks',
        payload: {
          title: `Task ${i + 1}`,
          description: `Description ${i + 1}`,
          completed: false,
        },
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      })
    }

    const response = await app.inject({
      method: 'GET',
      url: '/tasks',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    })

    expect(response.statusCode).toBe(200)

    const body = response.json()

    expect(body).toMatchObject({
      page: expect.any(Number),
      limit: expect.any(Number),
      totalPages: expect.any(Number),
      tasks: expect.any(Array),
    })
    expect(body.tasks[0]).toMatchObject({
      id: expect.any(String),
      title: expect.any(String),
      description: expect.any(String),
      authorId: expect.any(String),
      completed: expect.any(Boolean),
      dueDate: expect.any(String),
      createdAt: expect.any(String),
      updatedAt: expect.any(String),
    })
  })
})
