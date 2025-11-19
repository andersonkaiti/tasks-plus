import { Button } from '@components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from '@components/ui/dialog'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@components/ui/dropdown-menu'
import { deleteTask } from '@http/tasks/delete-task'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Link } from '@tanstack/react-router'
import { AlertTriangleIcon, EllipsisVertical, Pen, Trash } from 'lucide-react'
import { parseAsInteger, useQueryStates } from 'nuqs'
import { useState } from 'react'
import { toast } from 'sonner'

interface IActionsRowProps {
  id: string
}

export function ActionsRow({ id }: IActionsRowProps) {
  const [open, setOpen] = useState(false)
  const [dialogOpen, setDialogOpen] = useState(false)

  const [{ page, limit }] = useQueryStates({
    page: parseAsInteger.withDefault(1),
    limit: parseAsInteger.withDefault(10),
  })

  const queryClient = useQueryClient()

  const { mutate } = useMutation({
    mutationFn: async () => await deleteTask(id),
    onSuccess: () => {
      setDialogOpen(false)
      setOpen(false)
      queryClient.invalidateQueries({
        queryKey: ['tasks', page, limit],
      })
      toast.success('Tarefa deletada com sucesso!')
    },
  })

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost">
          <EllipsisVertical className="size-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem
          className="w-full justify-between flex cursor-pointer"
          onSelect={(event) => {
            event.preventDefault()
            setDialogOpen(true)
          }}
        >
          Deletar
          <Trash />
        </DropdownMenuItem>

        <DropdownMenuItem
          className="w-full justify-between flex cursor-pointer"
          asChild
        >
          <Link to="/dashboard/tasks">
            Atualizar
            <Pen />
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="flex flex-col items-center gap-6">
          <div className="flex items-center gap-2">
            <span className="flex items-center justify-center bg-red-100 rounded-full p-2">
              <AlertTriangleIcon className="text-red-600 size-4" />
            </span>
            <DialogTitle className="text-lg font-semibold">
              Deletar tarefa
            </DialogTitle>
          </div>
          <DialogDescription className="text-center text-muted-foreground">
            Tem certeza de que deseja deletar essa tarefa? Essa ação não poderá
            ser desfeita.
          </DialogDescription>
          <div className="flex gap-3 w-full justify-end">
            <Button
              variant="ghost"
              onClick={() => setDialogOpen(false)}
              className="min-w-[100px]"
              type="button"
            >
              Cancelar
            </Button>
            <Button onClick={() => mutate()} type="button">
              <Trash className="mr-2 size-4" />
              Deletar tarefa
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </DropdownMenu>
  )
}
