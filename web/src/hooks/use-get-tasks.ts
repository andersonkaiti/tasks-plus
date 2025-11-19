import { getTasks } from '@http/tasks/get-tasks'
import { useQuery } from '@tanstack/react-query'
import { parseAsInteger, useQueryStates } from 'nuqs'

export function useGetTasks() {
  const [{ page, limit }] = useQueryStates({
    page: parseAsInteger.withDefault(1),
    limit: parseAsInteger.withDefault(10),
  })

  const result = useQuery({
    queryKey: ['tasks', page, limit],
    queryFn: async () => await getTasks({ page, limit }),
  })

  return {
    ...result,
  }
}
