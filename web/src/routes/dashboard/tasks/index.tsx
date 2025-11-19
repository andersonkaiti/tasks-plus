import { Button } from '@components/ui/button'
import { createFileRoute, Link } from '@tanstack/react-router'
import { Plus } from 'lucide-react'

export const Route = createFileRoute('/dashboard/tasks/')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div className="size-full flex-col flex p-4">
      <Button className="self-end w-fit" asChild>
        <Link to="/dashboard/tasks/create">
          <Plus />
          Cadastrar tarefa
        </Link>
      </Button>
    </div>
  )
}
