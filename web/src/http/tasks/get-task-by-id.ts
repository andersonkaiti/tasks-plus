import z from 'zod'
import { api } from '../api-client'

const getTaskByIdSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string().nullable(),
  authorId: z.string(),
  completed: z.boolean(),
  dueDate: z.string().nullable(),
  createdAt: z.string(),
  updatedAt: z.string(),
})

export async function getTaskById(taskId: string) {
  const data = await api.get(`tasks/${taskId}`).json()

  return getTaskByIdSchema.parse(data)
}
