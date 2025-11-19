import { Toaster } from '@components/ui/sonner'
import { QueryProvider } from '@providers/react-query'
import { Outlet, createRootRoute } from '@tanstack/react-router'
import { NuqsAdapter } from 'nuqs/adapters/react'

export const Route = createRootRoute({
  component: RootComponent,
})

function RootComponent() {
  return (
    <>
      <NuqsAdapter>
        <QueryProvider>
          <Outlet />
          <Toaster />
        </QueryProvider>
      </NuqsAdapter>
    </>
  )
}
