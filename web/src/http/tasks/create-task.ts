import { api } from '../api-client'

interface ICreateTaskRequest {
  title: string
  description?: string
  dueDate?: Date
  completed?: boolean
}

export async function createTask(task: ICreateTaskRequest) {
  await api.post('tasks', {
    json: task,
  })
}
