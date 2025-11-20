import { faker } from '@faker-js/faker'
import { beforeAll, describe, expect, it } from 'vitest'
import { app } from '../../app'

describe('Delete task - Integration (inject)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  it('should delete an existing task with inject and return 200', async () => {
    const username = faker.person.fullName()
    const email = faker.internet.email()
    const password = faker.internet.password()

    await app.inject({
      method: 'POST',
      url: '/sign-up',
      payload: {
        username,
        email,
        password,
        confirmPassword: password,
      },
    })

    const loginResponse = await app.inject({
      method: 'POST',
      url: '/sign-in',
      payload: {
        email,
        password,
      },
    })

    const token = loginResponse.json().token

    const createTaskResponse = await app.inject({
      method: 'POST',
      url: '/tasks',
      payload: {
        title: faker.lorem.words(3),
        description: faker.lorem.sentence(),
        completed: false,
        dueDate: faker.date.future().toISOString(),
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    const taskId = createTaskResponse.json().task.id

    const deleteResponse = await app.inject({
      method: 'DELETE',
      url: `/tasks/${taskId}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    expect(deleteResponse.statusCode).toBe(200)

    const getResponse = await app.inject({
      method: 'GET',
      url: `/tasks/${taskId}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    expect(getResponse.statusCode).toBe(404)
  })

  it('should return 404 when deleting a non-existent task (inject)', async () => {
    const username = faker.person.fullName()
    const email = faker.internet.email()
    const password = faker.internet.password()

    await app.inject({
      method: 'POST',
      url: '/sign-up',
      payload: {
        username,
        email,
        password,
        confirmPassword: password,
      },
    })

    const loginResponse = await app.inject({
      method: 'POST',
      url: '/sign-in',
      payload: {
        email,
        password,
      },
    })

    const token = loginResponse.json().token

    const fakeId = faker.string.uuid()

    const response = await app.inject({
      method: 'DELETE',
      url: `/tasks/${fakeId}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    expect(response.statusCode).toBe(404)
  })

  it('should return 401 if not authenticated (inject)', async () => {
    const username = faker.person.fullName()
    const email = faker.internet.email()
    const password = faker.internet.password()

    await app.inject({
      method: 'POST',
      url: '/sign-up',
      payload: {
        username,
        email,
        password,
        confirmPassword: password,
      },
    })

    const loginResponse = await app.inject({
      method: 'POST',
      url: '/sign-in',
      payload: {
        email,
        password,
      },
    })

    const token = loginResponse.json().token

    const createTaskResponse = await app.inject({
      method: 'POST',
      url: '/tasks',
      payload: {
        title: faker.lorem.words(2),
        description: faker.lorem.sentence(),
        completed: false,
        dueDate: faker.date.future().toISOString(),
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    const taskId = createTaskResponse.json().task.id

    const response = await app.inject({
      method: 'DELETE',
      url: `/tasks/${taskId}`,
    })

    expect(response.statusCode).toBe(401)
  })
})
