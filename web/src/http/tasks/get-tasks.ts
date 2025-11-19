import z from 'zod'
import { api } from '../api-client'

export interface ITaskRequest {
  page?: number
  limit?: number
}

const getTasksSchema = z.object({
  page: z.number(),
  limit: z.number(),
  totalPages: z.number(),
  tasks: z.array(
    z.object({
      id: z.string(),
      title: z.string(),
      description: z.string().nullable(),
      authorId: z.string(),
      completed: z.boolean(),
      dueDate: z.string().nullable(),
      createdAt: z.string(),
      updatedAt: z.string(),
    }),
  ),
})

export async function getTasks({ page, limit }: ITaskRequest) {
  const url = new URL('tasks', window.location.origin)

  if (page !== undefined) {
    url.searchParams.set('page', page.toString())
  }

  if (limit !== undefined) {
    url.searchParams.set('limit', limit.toString())
  }

  const data = await api
    .get('tasks', {
      searchParams: url.searchParams,
    })
    .json()

  console.log(data)

  return getTasksSchema.parse(data)
}
