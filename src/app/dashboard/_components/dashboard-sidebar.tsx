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
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";

import Image from "next/image";
import logo from "../../../../public/logo.svg";
import Link from "next/link";

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
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <Image
              src={logo}
              alt="Logo institucional"
              className="m-2 mb-4 dark:grayscale dark:invert"
              width={177}
              height={51}
            />
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
      <SidebarRail />
    </Sidebar>
  );
}
