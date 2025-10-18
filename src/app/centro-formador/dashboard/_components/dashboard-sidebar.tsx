"use client"; // 1. Added this

import { Home, FilePlus, BookOpen, FileText, Send, Bell } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";

import Link from "next/link";
import {
  SidebarTooltipWrapper,
  TooltipProviderWrapper,
} from "./sidebar-menu-item-wrapper";
import { NavUser } from "./nav-user";
import Logo from "./logo";
import { usePathname } from "next/navigation"; // 2. Imported this

interface User {
  name: string;
  email: string;
  avatar: string;
}

interface Item {
  title: string;
  url: string;
  icon: React.ElementType;
}

const data: User[] = [
  {
    name: "INACAP",
    email: "coordinador@inacap.cl",
    avatar: "/avatars/inacap-logo.png",
  },
];

const items: Item[] = [
  {
    title: "Inicio",
    url: "/centro-formador/dashboard",
    icon: Home,
  },
  {
    title: "Solicitud de Cupos",
    url: "/centro-formador/dashboard/solicitud-de-cupos",
    icon: FilePlus,
  },
  {
    title: "Gestion de Alumnos",
    url: "/centro-formador/dashboard/gestion-de-alumnos",
    icon: BookOpen,
  },
  {
    title: "Nóminas Enviadas",
    url: "/centro-formador/dashboard/nominas-enviadas",
    icon: Send,
  },
  {
    title: "Notificaciones",
    url: "/centro-formador/dashboard/notificaciones",
    icon: Bell,
  },
  {
    title: "Documentos",
    url: "/centro-formador/dashboard/documentos",
    icon: FileText,
  },
];

export function DashboardSidebar() {
  const pathname = usePathname(); // 3. Get the current pathname

  return (
    <TooltipProviderWrapper>
      <Sidebar collapsible="icon">
        <SidebarContent className="backdrop-blur-2xl">
          <SidebarGroup>
            <SidebarGroupContent>
              <Logo />
              <SidebarMenu>
                {items.map((item) => {
                  // 4. Check if the item is active
                  const isBaseDashboard =
                    item.url === "/centro-formador/dashboard";
                  const isActive = isBaseDashboard
                    ? pathname === item.url // Exact match for "Inicio"
                    : pathname.startsWith(item.url); // Partial match for all others

                  return (
                    <SidebarMenuItem key={item.title}>
                      <SidebarTooltipWrapper title={item.title}>
                        <SidebarMenuButton
                          className="py-5"
                          data-active={isActive} // 5. Pass active state
                          asChild
                        >
                          <Link href={item.url}>
                            <item.icon />
                            <span>{item.title}</span>
                          </Link>
                        </SidebarMenuButton>
                      </SidebarTooltipWrapper>
                    </SidebarMenuItem>
                  );
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter>
          <NavUser user={data[0]} />
        </SidebarFooter>
        <SidebarRail />
      </Sidebar>
    </TooltipProviderWrapper>
  );
}