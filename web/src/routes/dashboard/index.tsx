import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/dashboard/')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div className="h-full flex justify-center items-center">
      <h1 className="text-xl font-medium">Boas-vindas à dashboard!</h1>
    </div>
  )
}
