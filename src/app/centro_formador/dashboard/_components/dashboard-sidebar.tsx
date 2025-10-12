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
} from "@/components/ui/sidebar";

import Link from "next/link";
import {
  SidebarTooltipWrapper,
  TooltipProviderWrapper,
} from "./sidebar-menu-item-wrapper";
import { NavUser } from "./nav-user";
import Logo from "./logo";

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
    name: "admin",
    email: "admin@example.com",
    avatar: "/avatars/admin.jpg",
  },
];

const items: Item[] = [
  {
    title: "Inicio",
    url: "/centro_formador/dashboard/",
    icon: Home,
  },
  {
    title: "Solicitud de Cupos",
    url: "/centro_formador/dashboard/solicitud-de-cupos",
    icon: FilePlus,
  },
  {
    title: "Nomina de Alumnos",
    url: "/centro_formador/dashboard/nomina-de-alumnos",
    icon: BookOpen,
  },
  {
    title: "Documentos",
    url: "/centro_formador/dashboard/documentos",
    icon: FileText,
  },
];

export function DashboardSidebar() {
  return (
    <TooltipProviderWrapper>
      <Sidebar collapsible="icon">
        <SidebarContent className="backdrop-blur-2xl">
          <SidebarGroup>
            <SidebarGroupContent>
              <Logo />
              <SidebarMenu>
                {items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarTooltipWrapper title={item.title}>
                      <SidebarMenuButton className="py-5" asChild>
                        <Link href={item.url}>
                          <item.icon />
                          <span>{item.title}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarTooltipWrapper>
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
    </TooltipProviderWrapper>
  );
}
