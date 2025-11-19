import { type ColumnDef } from '@tanstack/react-table'
import { Check, X } from 'lucide-react'
import { ActionsRow } from './actions-row'

export interface ITask {
  id: string
  title: string
  description: string | null
  authorId: string
  completed: boolean
  dueDate: string | null
  createdAt: string
  updatedAt: string
}

export const tasksTableColumns: ColumnDef<ITask>[] = [
  {
    id: 'title',
    header: 'Título',
    cell: ({ row }) => row.original.title,
  },
  {
    id: 'completed',
    header: 'Status',
    cell: ({ row }) => {
      const completed = row.original.completed
      return (
        <span
          className={`inline-flex items-center gap-1 ${
            completed ? 'text-green-600' : 'text-yellow-600'
          }`}
        >
          {completed ? (
            <>
              <Check className="size-4" />
              Concluída
            </>
          ) : (
            <>
              <X className="size-4" />
              Pendente
            </>
          )}
        </span>
      )
    },
  },
  {
    id: 'dueDate',
    header: 'Prazo',
    cell: ({ row }) =>
      row.original.dueDate
        ? new Date(row.original.dueDate).toLocaleDateString('pt-BR')
        : '—',
  },
  {
    id: 'actions',
    header: 'Ações',
    cell: ({ row }) => <ActionsRow id={row.original.id} />,
  },
]
