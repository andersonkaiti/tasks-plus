import { DashboardSidebar } from '@components/dashboard/sidebar'
import { AnimatedThemeToggler } from '@components/ui/animated-theme-toggler'
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from '@components/ui/sidebar'
import { createFileRoute, Outlet, redirect } from '@tanstack/react-router'
import Cookies from 'js-cookie'

export const Route = createFileRoute('/dashboard')({
  component: RouteComponent,
  beforeLoad: () => {
    const hasToken = Cookies.get('token')

    if (!hasToken) {
      throw redirect({
        to: '/auth/sign-in',
      })
    }
  },
})

function RouteComponent() {
  return (
    <>
      <SidebarProvider>
        <DashboardSidebar />

        <SidebarInset className="p-2">
          <SidebarTrigger />

          <Outlet />
        </SidebarInset>

        <div className="fixed top-3 right-3">
          <AnimatedThemeToggler className="size-4 cursor-pointer" />
        </div>
      </SidebarProvider>
    </>
  )
}
