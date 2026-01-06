import React from 'react';
import {
  Home,
  ClipboardList,
  FileText,
  PanelLeftClose,
  PanelLeft,
  LucideIcon,
  AlertCircle
} from 'lucide-react';
import { NavLink } from 'react-router-dom';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@/core/components/ui/sidebar';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/core/components/ui/tooltip';
import { Button } from '@/core/components/ui/button';

// Definición de la interfaz para los items del menú
export interface SidebarItem {
  name: string;
  path: string;
  icon: LucideIcon | React.ComponentType<any>;
}

// Definición de items del menú principal (Default / SAS Connect)
export const defaultMenuItems: SidebarItem[] = [
  { name: 'Inicio', path: '/sas-connect', icon: Home },
  {
    name: 'Gestión de prestaciones',
    path: '/sas-connect/gestion-prestaciones',
    icon: ClipboardList,
  },
  {
    name: 'Mis Prestaciones',
    path: '/sas-connect/mis-prestaciones',
    icon: ClipboardList,
  },
  {
    name: 'Pre liquidaciones',
    path: '/sas-connect/pre-liquidaciones',
    icon: FileText,
  },
];

interface AppSidebarProps {
  items?: SidebarItem[];
  logoSrc?: string;
  footerText?: string;
  className?: string;
}

export function AppSidebar({ items, logoSrc, footerText, className }: AppSidebarProps) {
  const { state, toggleSidebar } = useSidebar();
  const isCollapsed = state === 'collapsed';

  // Usar items pasados por prop o los default
  const menuList = items || defaultMenuItems;

  return (
    <Sidebar collapsible="icon" className={className}>
      <SidebarHeader>
        <div className="flex items-center justify-between px-2 py-4">
          {!isCollapsed && (
            <img
              src={logoSrc || "/logo-colonia-suiza-white.png"}
              alt="Logo Colonia Suiza"
              className="h-10 w-auto"
            />
          )}
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleSidebar}
            className="h-8 w-8"
            aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {isCollapsed ? (
              <PanelLeft className="h-4 w-4" />
            ) : (
              <PanelLeftClose className="h-4 w-4" />
            )}
          </Button>
        </div>
      </SidebarHeader>

      <SidebarContent>
        {/* Menú Principal */}
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuList.map((item) => (
                <SidebarMenuItem key={item.name}>
                  {isCollapsed ? (
                    <TooltipProvider delayDuration={0}>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <SidebarMenuButton asChild>
                            <NavLink
                              to={item.path}
                              end={item.path === '/sas-connect' || item.path === '/sas-incapacidades'}
                              className={({ isActive }) =>
                                isActive ? 'bg-sidebar-accent text-sidebar-accent-foreground' : ''
                              }
                            >
                              <item.icon className="h-4 w-4" />
                              <span>{item.name}</span>
                            </NavLink>
                          </SidebarMenuButton>
                        </TooltipTrigger>
                        <TooltipContent side="right" className="flex items-center gap-4">
                          {item.name}
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  ) : (
                    <SidebarMenuButton asChild>
                      <NavLink
                        to={item.path}
                        end={item.path === '/sas-connect' || item.path === '/sas-incapacidades'}
                        className={({ isActive }) =>
                          isActive ? 'bg-sidebar-accent text-sidebar-accent-foreground' : ''
                        }
                      >
                        <item.icon className="h-4 w-4" />
                        <span>{item.name}</span>
                      </NavLink>
                    </SidebarMenuButton>
                  )}
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        {!isCollapsed && (
          <div className="p-4 text-center text-xs text-sidebar-foreground/80">
            {footerText || `© ${new Date().getFullYear()} | Designed by Product, powered by AI.🚀❤️`}
          </div>
        )}
      </SidebarFooter>
    </Sidebar>
  );
}

export default AppSidebar;
