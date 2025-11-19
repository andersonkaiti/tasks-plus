import { zodResolver } from '@hookform/resolvers/zod'
import { createTask } from '@http/tasks/create-task'
import { useNavigate } from '@tanstack/react-router'
import { HTTPError } from 'ky'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import z from 'zod'

const createTaskSchema = z.object({
  title: z.string().min(1, 'Título é obrigatório'),
  description: z.string().optional(),
  completed: z.boolean().optional(),
  dueDate: z.date('Data inválida').optional(),
})

type CreateTaskSchema = z.infer<typeof createTaskSchema>

export function useCreateTask() {
  const [serverError, setServerError] = useState<null | string>(null)

  const navigate = useNavigate()

  const form = useForm<CreateTaskSchema>({
    resolver: zodResolver(createTaskSchema),
    values: {
      title: '',
      description: '',
      completed: false,
      dueDate: undefined,
    },
  })

  const handleSubmit = form.handleSubmit(async (values: CreateTaskSchema) => {
    try {
      await createTask(values)

      toast.success('Tarefa criada com sucesso!')

      navigate({
        to: '/dashboard/tasks',
      })
    } catch (err) {
      if (err instanceof HTTPError) {
        const errorBody = await err.response.json()

        setServerError(errorBody.message)
      }
    }
  })

  return {
    form,
    serverError,
    handleSubmit,
  }
}
