import { DataTable } from '@components/ui/data-table'
import { Paginator } from '@components/ui/paginator'
import { useGetTasks } from '@hooks/use-get-tasks'
import { tasksTableColumns } from './tasks-table-columns'

export function TasksTable() {
  const { data, isLoading } = useGetTasks()

  return (
    <>
      {isLoading && <p>Carregando...</p>}

      {!isLoading && data && (
        <DataTable data={data?.tasks} columns={tasksTableColumns} />
      )}

      <div className="mt-auto">
        <Paginator totalPages={data?.totalPages ?? 1} />
      </div>
    </>
  )
}
