'use client';

import Link from "next/link";
import { usePathname } from 'next/navigation';
import {
  Sidebar,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarProvider,
  SidebarFooter,
} from "@/components/ui/sidebar";
import { LayoutDashboard, Ticket, Users, CalendarDays, Settings, Bell, Activity, Calendar } from "lucide-react";
import { LogoutButton } from "./logout-button";
import { useData } from "@/context/DataContext";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { format } from 'date-fns';

const pageDetails: { [key: string]: { title: string; subtitle: string } } = {
  '/admin': { title: 'Admin Dashboard', subtitle: 'Monitor your ticket sales and manage your platform' },
  '/admin/tickets': { title: 'Ticket Management', subtitle: 'Approve, reject, or remove ticket listings.' },
  '/admin/users': { title: 'User Management', subtitle: 'View all sellers and buyers on the platform.' },
  '/admin/games': { title: 'Game Schedule', subtitle: 'Add, edit, or remove games.' },
  '/admin/notifications': { title: 'Notifications', subtitle: 'Manage your notification settings and view recent alerts.' },
  '/admin/settings': { title: 'Settings', subtitle: 'Manage your admin panel settings.' },
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { currentUser } = useData();
  const pathname = usePathname();
  
  const currentDetails = pageDetails[pathname] || { title: 'Admin Panel', subtitle: 'Welcome' };

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-background text-foreground">
        <Sidebar className="border-r border-slate-700/50 bg-slate-900/95 backdrop-blur-md">
          {/* Sidebar Header */}
          <div className="flex h-[89px] items-center p-6 border-b border-slate-700/50">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <LayoutDashboard className="h-5 w-5 text-white" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-white font-headline uppercase">Admin Panel</h2>
                <p className="text-xs text-slate-400">Management Dashboard</p>
              </div>
            </div>
          </div>

          <SidebarContent className="px-4 py-6">
            <div className="mb-6">
              <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3 px-3">
                Main Navigation
              </h3>
              <SidebarMenu className="space-y-2">
                <SidebarMenuItem>
                  <SidebarMenuButton 
                    asChild 
                    tooltip="Dashboard"
                    isActive={pathname === '/admin'}
                    className="group relative overflow-hidden data-[active=true]:bg-gradient-to-r data-[active=true]:from-blue-600/20 data-[active=true]:to-transparent data-[active=true]:border-blue-500/30 text-slate-300 hover:bg-slate-800/50 hover:text-white border border-transparent hover:border-slate-600/50 transition-all duration-300"
                  >
                    <Link href="/admin" className="flex items-center space-x-3 px-3 py-3 rounded-lg">
                      <div className="p-1.5 bg-blue-500/20 rounded-md group-hover:bg-blue-500/30 transition-colors">
                        <LayoutDashboard className="h-4 w-4 text-blue-400" />
                      </div>
                      <span className="font-medium">Dashboard</span>
                      <div className="absolute inset-y-0 right-0 w-1 bg-blue-500 opacity-0 group-data-[active=true]:opacity-100 transition-opacity"></div>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                
                <SidebarMenuItem>
                  <SidebarMenuButton 
                    asChild 
                    tooltip="Tickets"
                    isActive={pathname === '/admin/tickets'}
                    className="group relative overflow-hidden data-[active=true]:bg-gradient-to-r data-[active=true]:from-purple-600/20 data-[active=true]:to-transparent data-[active=true]:border-purple-500/30 text-slate-300 hover:bg-slate-800/50 hover:text-white border border-transparent hover:border-slate-600/50 transition-all duration-300"
                  >
                    <Link href="/admin/tickets" className="flex items-center space-x-3 px-3 py-3 rounded-lg">
                      <div className="p-1.5 bg-purple-500/20 rounded-md group-hover:bg-purple-500/30 transition-colors">
                        <Ticket className="h-4 w-4 text-purple-400" />
                      </div>
                      <span className="font-medium">Ticket Management</span>
                       <div className="absolute inset-y-0 right-0 w-1 bg-purple-500 opacity-0 group-data-[active=true]:opacity-100 transition-opacity"></div>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                
                <SidebarMenuItem>
                  <SidebarMenuButton 
                    asChild 
                    tooltip="Users"
                    isActive={pathname === '/admin/users'}
                    className="group relative overflow-hidden data-[active=true]:bg-gradient-to-r data-[active=true]:from-green-600/20 data-[active=true]:to-transparent data-[active=true]:border-green-500/30 text-slate-300 hover:bg-slate-800/50 hover:text-white border border-transparent hover:border-slate-600/50 transition-all duration-300"
                  >
                    <Link href="/admin/users" className="flex items-center space-x-3 px-3 py-3 rounded-lg">
                      <div className="p-1.5 bg-green-500/20 rounded-md group-hover:bg-green-500/30 transition-colors">
                        <Users className="h-4 w-4 text-green-400" />
                      </div>
                      <span className="font-medium">User Management</span>
                       <div className="absolute inset-y-0 right-0 w-1 bg-green-500 opacity-0 group-data-[active=true]:opacity-100 transition-opacity"></div>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                
                <SidebarMenuItem>
                  <SidebarMenuButton 
                    asChild 
                    tooltip="Games"
                    isActive={pathname === '/admin/games'}
                    className="group relative overflow-hidden data-[active=true]:bg-gradient-to-r data-[active=true]:from-orange-600/20 data-[active=true]:to-transparent data-[active=true]:border-orange-500/30 text-slate-300 hover:bg-slate-800/50 hover:text-white border border-transparent hover:border-slate-600/50 transition-all duration-300"
                  >
                    <Link href="/admin/games" className="flex items-center space-x-3 px-3 py-3 rounded-lg">
                      <div className="p-1.5 bg-orange-500/20 rounded-md group-hover:bg-orange-500/30 transition-colors">
                        <CalendarDays className="h-4 w-4 text-orange-400" />
                      </div>
                      <span className="font-medium">Game Schedule</span>
                       <div className="absolute inset-y-0 right-0 w-1 bg-orange-500 opacity-0 group-data-[active=true]:opacity-100 transition-opacity"></div>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </div>

            <div className="mb-6">
              <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3 px-3">
                Tools
              </h3>
              <SidebarMenu className="space-y-2">
                <SidebarMenuItem>
                  <SidebarMenuButton 
                    asChild 
                    tooltip="Notifications"
                    isActive={pathname === '/admin/notifications'}
                    className="group relative overflow-hidden text-slate-300 hover:bg-slate-800/50 hover:text-white border border-transparent hover:border-slate-600/50 transition-all duration-300 data-[active=true]:bg-gradient-to-r data-[active=true]:from-yellow-600/20 data-[active=true]:to-transparent data-[active=true]:border-yellow-500/30"
                  >
                    <Link href="/admin/notifications" className="flex items-center space-x-3 px-3 py-3 rounded-lg">
                      <div className="p-1.5 bg-yellow-500/20 rounded-md group-hover:bg-yellow-500/30 transition-colors">
                        <Bell className="h-4 w-4 text-yellow-400" />
                      </div>
                      <span className="font-medium">Notifications</span>
                       <div className="absolute inset-y-0 right-0 w-1 bg-yellow-500 opacity-0 group-data-[active=true]:opacity-100 transition-opacity"></div>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                
                <SidebarMenuItem>
                  <SidebarMenuButton 
                    asChild 
                    tooltip="Settings"
                    isActive={pathname === '/admin/settings'}
                    className="group relative overflow-hidden text-slate-300 hover:bg-slate-800/50 hover:text-white border border-transparent hover:border-slate-600/50 transition-all duration-300 data-[active=true]:bg-gradient-to-r data-[active=true]:from-slate-600/20 data-[active=true]:to-transparent data-[active=true]:border-slate-500/30"
                  >
                    <Link href="/admin/settings" className="flex items-center space-x-3 px-3 py-3 rounded-lg">
                      <div className="p-1.5 bg-slate-500/20 rounded-md group-hover:bg-slate-500/30 transition-colors">
                        <Settings className="h-4 w-4 text-slate-400" />
                      </div>
                      <span className="font-medium">Settings</span>
                       <div className="absolute inset-y-0 right-0 w-1 bg-slate-500 opacity-0 group-data-[active=true]:opacity-100 transition-opacity"></div>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </div>
          </SidebarContent>
          
          <SidebarFooter className="p-4 border-t border-slate-700/50">
            <SidebarMenu>
              <SidebarMenuItem>
                <div className="mb-4 p-4 bg-gradient-to-r from-slate-800 to-slate-700 rounded-lg border border-slate-600/50">
                  <div className="flex items-center space-x-3">
                     <Avatar className="h-10 w-10 border-2 border-slate-600">
                        <AvatarFallback className="bg-slate-700 text-slate-300">
                          {currentUser?.name?.charAt(0)?.toUpperCase()}
                        </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium text-white">{currentUser?.name}</p>
                      <p className="text-xs text-slate-400">{currentUser?.email}</p>
                    </div>
                  </div>
                </div>
                <LogoutButton />
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarFooter>
        </Sidebar>
        
        <div className="flex-1 flex flex-col h-screen overflow-hidden">
           <header className="flex h-[89px] shrink-0 items-center justify-between gap-4 border-b border-slate-700/50 bg-slate-900/95 px-6">
             <div>
                <h1 className="text-3xl font-bold text-white mb-1 tracking-tight font-headline uppercase">
                  {currentDetails.title}
                </h1>
                <p className="text-slate-400 text-base">
                  {currentDetails.subtitle}
                </p>
              </div>
              <div className="hidden md:flex items-center space-x-4">
                <div className="flex items-center space-x-2 bg-slate-800/50 px-4 py-2 rounded-lg border border-slate-700">
                  <Activity className="h-4 w-4 text-green-400" />
                  <span className="text-sm text-slate-300">System Online</span>
                </div>
                <div className="flex items-center space-x-2 bg-slate-800/50 px-4 py-2 rounded-lg border border-slate-700">
                  <Calendar className="h-4 w-4 text-blue-400" />
                  <span className="text-sm text-slate-300">
                    {format(new Date(), 'MMM d, yyyy')}
                  </span>
                </div>
              </div>
          </header>
          <main className="flex-1 w-full overflow-y-auto bg-slate-900">
              {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
