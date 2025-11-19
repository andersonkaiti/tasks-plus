import { api } from '../api-client'

export async function deleteTask(taskId: string) {
  await api.delete(`tasks/${taskId}`)
}
