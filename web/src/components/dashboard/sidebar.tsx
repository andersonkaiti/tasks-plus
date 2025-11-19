import { Button } from '@components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@components/ui/dropdown-menu'
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
} from '@components/ui/sidebar'
import { Link } from '@tanstack/react-router'
import Cookies from 'js-cookie'
import { EllipsisVertical, LogOut } from 'lucide-react'

export function DashboardSidebar() {
  function logOut() {
    Cookies.remove('token')
  }

  return (
    <Sidebar>
      <SidebarHeader>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="p-6 flex justify-between w-full">
              <h1 className="font-bold tracking-widest text-xl uppercase">
                Tasks+
              </h1>

              <EllipsisVertical className="size" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <form onSubmit={logOut} className="w-full">
              <DropdownMenuItem onClick={logOut} asChild className="w-full">
                <button
                  type="submit"
                  className="flex cursor-pointer w-full items-center justify-between gap-2"
                >
                  <LogOut />
                  <span>Deslogar</span>
                </button>
              </DropdownMenuItem>
            </form>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarHeader>

      <SidebarSeparator />

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Dashboard</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link to="/dashboard">Tarefas</Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}
