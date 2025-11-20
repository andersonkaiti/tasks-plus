import { faker } from '@faker-js/faker'
import request from 'supertest'
import { beforeAll, describe, expect, it } from 'vitest'
import { app } from '../../app'

describe('Get tasks', () => {
  beforeAll(async () => {
    await app.ready()
  })

  it('[GET] /tasks should be able to retrieve the tasks', async () => {
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

    for (let i = 0; i < 5; i++) {
      await request(app.server)
        .post('/tasks')
        .set('Content-Type', 'application/json')
        .set('Authorization', `Bearer ${token}`)
        .send({
          title: faker.lorem.words(5),
          description: faker.lorem.paragraph(),
          completed: faker.datatype.boolean(),
          dueDate: faker.date.anytime(),
        })
    }

    const response = await request(app.server)
      .get('/tasks')
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${token}`)

    expect(response.status).toEqual(200)
    expect(response.body).toMatchObject({
      page: expect.any(Number),
      limit: expect.any(Number),
      totalPages: expect.any(Number),
      tasks: expect.any(Array),
    })
    expect(response.body.tasks[0]).toMatchObject({
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

  it('[GET] /tasks should be able to retrieve the tasks', async () => {
    const response = await request(app.server)
      .get('/tasks')
      .set('Content-Type', 'application/json')

    expect(response.status).toEqual(401)
  })
})
