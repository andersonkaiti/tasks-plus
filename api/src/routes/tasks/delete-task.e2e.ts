import { faker } from '@faker-js/faker'
import request from 'supertest'
import { beforeAll, describe, expect, it } from 'vitest'
import { app } from '../../app'

describe('Delete task', () => {
  beforeAll(async () => {
    await app.ready()
  })

  it('[DELETE] /tasks/:id with valid id and token should delete the task', async () => {
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
        description: faker.lorem.paragraph(),
        completed: faker.datatype.boolean(),
        dueDate: faker.date.anytime(),
      })

    const response = await request(app.server)
      .delete(`/tasks/${taskId}`)
      .set('Authorization', `Bearer ${token}`)

    expect(response.status).toEqual(200)

    const getResponse = await request(app.server)
      .get(`/tasks/${taskId}`)
      .set('Authorization', `Bearer ${token}`)

    expect(getResponse.status).toEqual(404)
  })

  it('[DELETE] /tasks/:id should return 404 when task does not exist', async () => {
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
      .delete(`/tasks/${nonExistentTaskId}`)
      .set('Authorization', `Bearer ${token}`)

    expect(response.status).toEqual(404)
  })

  it('[DELETE] /tasks/:id should return 401 when authorization is missing', async () => {
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
        description: faker.lorem.paragraph(),
        completed: faker.datatype.boolean(),
        dueDate: faker.date.anytime(),
      })

    const response = await request(app.server).delete(`/tasks/${taskId}`)

    expect(response.status).toEqual(401)
  })
})
