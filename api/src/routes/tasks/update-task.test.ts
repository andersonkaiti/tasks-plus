import { faker } from '@faker-js/faker'
import { beforeAll, describe, expect, it } from 'vitest'
import { app } from '../../app'

describe('Update task - Integration (inject)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  it('should update an existing task with inject and return 200', async () => {
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

    const createTaskPayload = {
      title: faker.lorem.words(3),
      description: faker.lorem.sentence(),
      completed: faker.datatype.boolean(),
      dueDate: faker.date.future().toISOString(),
    }

    const createTaskResponse = await app.inject({
      method: 'POST',
      url: '/tasks',
      payload: createTaskPayload,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    const taskId = createTaskResponse.json().task.id

    const updateTaskPayload = {
      title: faker.lorem.words(4),
      description: faker.lorem.sentences(2),
      completed: faker.datatype.boolean(),
      dueDate: faker.date.future().toISOString(),
    }

    const updateResponse = await app.inject({
      method: 'PUT',
      url: `/tasks/${taskId}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      payload: updateTaskPayload,
    })

    expect(updateResponse.statusCode).toBe(200)
  })

  it('should return 404 when updating a non-existent task (inject)', async () => {
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
      method: 'PUT',
      url: `/tasks/${fakeId}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      payload: {
        title: faker.lorem.words(2),
        description: faker.lorem.sentence(),
        completed: faker.datatype.boolean(),
        dueDate: faker.date.future().toISOString(),
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

    const createTaskPayload = {
      title: faker.lorem.words(2),
      description: faker.lorem.sentence(),
      completed: faker.datatype.boolean(),
      dueDate: faker.date.future().toISOString(),
    }

    const createTaskResponse = await app.inject({
      method: 'POST',
      url: '/tasks',
      payload: createTaskPayload,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    const taskId = createTaskResponse.json().task.id

    const updateTaskPayload = {
      title: faker.lorem.words(2),
      description: faker.lorem.sentence(),
      completed: faker.datatype.boolean(),
      dueDate: faker.date.future().toISOString(),
    }

    const response = await app.inject({
      method: 'PUT',
      url: `/tasks/${taskId}`,
      payload: updateTaskPayload,
    })

    expect(response.statusCode).toBe(401)
  })
})
