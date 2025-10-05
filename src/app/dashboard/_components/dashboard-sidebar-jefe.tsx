"use client";

import {
  Home,
  ClipboardList,
  CalendarClock, 
  ClipboardCheck,
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
    name: "Dr. Ricardo Soto",
    email: "ricardo.soto@hospital.cl",
    avatar: "/avatars/doctor.jpg",
};

const items = [
  {
    title: "Inicio",
    url: "/dashboard",
    icon: Home,
  },
  {
    title: "Nóminas Pendientes",
    url: "/dashboard/nominas-pendientes",
    icon: ClipboardCheck,
  },
  {
    title: "Programación del Servicio",
    url: "/dashboard/programacion",
    icon: CalendarClock,
  },
  {
    title: "Asistencia del Servicio",
    url: "/dashboard/asistencia",
    icon: ClipboardList,
  },
];

export function DashboardSidebarJefe() {
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