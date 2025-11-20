import { faker } from '@faker-js/faker'
import request from 'supertest'
import { beforeAll, describe, expect, it } from 'vitest'
import { app } from '../../app'

describe('Update task', () => {
  beforeAll(async () => {
    await app.ready()
  })

  it('[PUT] /tasks/:id should update an existing task and return 200', async () => {
    const email = faker.internet.email()
    const password = faker.internet.password()
    const username = faker.person.fullName()

    await request(app.server)
      .post('/sign-up')
      .set('Content-Type', 'application/json')
      .send({
        username,
        email,
        password,
        confirmPassword: password,
      })

    const {
      body: { token },
    } = await request(app.server)
      .post('/sign-in')
      .set('Content-Type', 'application/json')
      .send({
        email,
        password,
      })

    const {
      body: {
        task: { id: taskId },
      },
    } = await request(app.server)
      .post('/tasks')
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: faker.lorem.words(3),
        description: faker.lorem.sentences(2),
        completed: false,
        dueDate: faker.date.anytime(),
      })

    const updateResponse = await request(app.server)
      .put(`/tasks/${taskId}`)
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: faker.lorem.words(4),
        description: faker.lorem.sentences(3),
        completed: faker.datatype.boolean(),
        dueDate: faker.date.anytime(),
      })

    expect(updateResponse.status).toBe(200)
  })

  it('[PUT] /tasks/:id should return 404 when trying to update a non-existent task', async () => {
    const email = faker.internet.email()
    const password = faker.internet.password()
    const username = faker.person.fullName()

    await request(app.server)
      .post('/sign-up')
      .set('Content-Type', 'application/json')
      .send({
        username,
        email,
        password,
        confirmPassword: password,
      })

    const {
      body: { token },
    } = await request(app.server)
      .post('/sign-in')
      .set('Content-Type', 'application/json')
      .send({
        email,
        password,
      })

    const nonExistentTaskId = faker.string.uuid()

    const response = await request(app.server)
      .put(`/tasks/${nonExistentTaskId}`)
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: faker.lorem.words(2),
      })

    expect(response.status).toBe(404)
  })

  it('[PUT] /tasks/:id should return 401 if not authenticated', async () => {
    const nonExistentTaskId = faker.string.uuid()

    const response = await request(app.server)
      .put(`/tasks/${nonExistentTaskId}`)
      .set('Content-Type', 'application/json')
      .send({
        title: faker.lorem.words(2),
        completed: true,
      })

    expect(response.status).toBe(401)
  })
})
