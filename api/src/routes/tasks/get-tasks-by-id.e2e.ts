import { faker } from '@faker-js/faker'
import request from 'supertest'
import { beforeAll, describe, expect, it } from 'vitest'
import { app } from '../../app'

describe('Get task by id', () => {
  beforeAll(async () => {
    await app.ready()
  })

  it('[GET] /tasks/:id with valid id and token should return the task', async () => {
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
      .get(`/tasks/${taskId}`)
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${token}`)

    expect(response.status).toEqual(200)
    expect(response.body).toMatchObject({
      id: taskId,
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

    const nonExistentId = faker.string.uuid()
    const response = await request(app.server)
      .get(`/tasks/${nonExistentId}`)
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${token}`)

    expect(response.status).toEqual(404)
  })

  it('[GET] /tasks/:id should return 401 when authorization is missing', async () => {
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

    const createTaskResponse = await request(app.server)
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
      .get(`/tasks/${createTaskResponse.body.task.id}`)
      .set('Content-Type', 'application/json')

    expect(response.status).toEqual(401)
  })
})
