import { faker } from '@faker-js/faker'
import request from 'supertest'
import { beforeAll, describe, expect, it } from 'vitest'
import { app } from '../../app'

describe('Create task', () => {
  beforeAll(() => {
    app.ready()
  })

  it('[POST] /tasks should create a new task and return it', async () => {
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

    const response = await request(app.server)
      .post('/tasks')
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: faker.lorem.words(5),
        description: faker.lorem.paragraph(),
        completed: faker.datatype.boolean(),
        dueDate: faker.date.anytime(),
      })

    expect(response.status).toEqual(201)
    expect(response.body).toMatchObject({
      task: {
        id: expect.any(String),
        title: expect.any(String),
        description: expect.any(String),
        completed: expect.any(Boolean),
        dueDate: expect.anything(),
        authorId: expect.any(String),
        createdAt: expect.any(String),
        updatedAt: expect.any(String),
      },
    })
  })

  it('[POST] /tasks should not be able to create a new task if not authenticated', async () => {
    const response = await request(app.server)
      .post('/tasks')
      .set('Content-Type', 'application/json')
      .send({
        title: faker.lorem.words(5),
        description: faker.lorem.paragraph(),
        completed: faker.datatype.boolean(),
        dueDate: faker.date.anytime(),
      })

    expect(response.status).toEqual(401)
  })
})
