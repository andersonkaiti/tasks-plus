import { api } from '../api-client'

interface IUpdateTaskRequest {
  id: string
  title?: string
  description?: string
  dueDate?: Date
  completed?: boolean
}

export async function updateTask({ id, ...task }: IUpdateTaskRequest) {
  await api.put(`tasks/${id}`, {
    json: task,
  })
}
