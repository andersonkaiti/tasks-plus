import { zodResolver } from '@hookform/resolvers/zod'
import { getTaskById } from '@http/tasks/get-task-by-id'
import { updateTask } from '@http/tasks/update-task'
import { useQuery } from '@tanstack/react-query'
import { useNavigate, useParams } from '@tanstack/react-router'
import { HTTPError } from 'ky'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import z from 'zod'

const updateTaskSchema = z.object({
  title: z.string(),
  description: z.string().optional(),
  completed: z.boolean().optional(),
  dueDate: z.date().optional(),
})

type UpdateTaskSchema = z.infer<typeof updateTaskSchema>

export function useUpdateTask() {
  const [serverError, setServerError] = useState<null | string>(null)

  const navigate = useNavigate()

  const { id } = useParams({ from: '/dashboard/tasks/update/$id' })

  const { data: task } = useQuery({
    queryKey: ['task', id],
    queryFn: async () => await getTaskById(id),
  })

  const form = useForm<UpdateTaskSchema>({
    resolver: zodResolver(updateTaskSchema),
    defaultValues: {
      title: '',
      description: undefined,
      completed: false,
      dueDate: undefined,
    },
  })

  useEffect(() => {
    if (!task) {
      return
    }

    form.reset({
      title: task.title,
      description: task.description ?? undefined,
      completed: task.completed,
      dueDate: task.dueDate ? new Date(task.dueDate) : undefined,
    })
  }, [form, task])

  const handleSubmit = form.handleSubmit(async (values: UpdateTaskSchema) => {
    try {
      await updateTask({
        id,
        ...values,
      })

      toast.success('Tarefa atualizada com sucesso!')

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
