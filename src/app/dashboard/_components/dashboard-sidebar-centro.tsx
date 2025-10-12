"use client";

import {
  Home,
  FilePlus,
  Settings,
  Users,
  CalendarCheck,
} from "lucide-react";

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
import { NavUser } from "./nav-user";
import Logo from "./logo";

const data = {
    name: "Ana García",
    email: "ana.garcia@inacap.cl",
    avatar: "/avatars/user.jpg",
};

const items = [
  {
    title: "Inicio",
    url: "/dashboard",
    icon: Home,
  },
  {
    title: "Solicitudes de Cupos",
    url: "/dashboard/solicitud-de-cupos",
    icon: FilePlus,
  },
  {
    title: "Nóminas de Alumnos",
    url: "/dashboard/nominas",
    icon: Users,
  },
  {
    title: "Programación",
    url: "/dashboard/programacion",
    icon: CalendarCheck,
  },
  {
    title: "Configuración",
    url: "/dashboard/configuracion",
    icon: Settings,
  },
];

export function DashboardSidebarCentro() {
  return (
    <Sidebar collapsible="icon">
      <SidebarContent className="backdrop-blur-2xl">
        <SidebarGroup>
          <SidebarGroupContent>
            <Logo />
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton className="py-5" asChild>
                    <Link href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}