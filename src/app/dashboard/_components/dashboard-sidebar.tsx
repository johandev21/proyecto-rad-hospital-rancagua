import {
  Calendar,
  Home,
  FilePlus,
  Settings,
  Users,
  BookOpen,
  ClipboardList,
  Coins,
  FileText,
  BarChart2,
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
  useSidebar,
} from "@/components/ui/sidebar";

import Link from "next/link";
import { NavUser } from "./nav-user";
import Logo from "./logo";

interface User {
  name: string;
  email: string;
  avatar: string;
}

const data: User[] = [
  {
    name: "admin",
    email: "admin@example.com",
    avatar: "/avatars/admin.jpg",
  }
];

const items = [
  {
    title: "Inicio",
    url: "/dashboard",
    icon: Home,
  },
  {
    title: "Capacidad Formadora",
    url: "/dashboard/capacidad-formadora",
    icon: Users,
  },
  {
    title: "Solicitud de Cupos",
    url: "/dashboard/solicitud-de-cupos",
    icon: FilePlus,
  },
  {
    title: "Programación",
    url: "/dashboard/programacion",
    icon: Calendar,
  },
  {
    title: "Registro de Alumnos",
    url: "/dashboard/registro-de-alumnos",
    icon: BookOpen,
  },
  {
    title: "Asistencia",
    url: "/dashboard/asistencia",
    icon: ClipboardList,
  },
  {
    title: "Retribuciones",
    url: "/dashboard/retribuciones",
    icon: Coins,
  },
  {
    title: "Documentos",
    url: "/dashboard/documentos",
    icon: FileText,
  },
  {
    title: "Reportes",
    url: "/dashboard/reportes",
    icon: BarChart2,
  },
  {
    title: "Configuración",
    url: "/dashboard/configuracion",
    icon: Settings,
  },
];

export function DashboardSidebar() {
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
        <NavUser user={data[0]} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
