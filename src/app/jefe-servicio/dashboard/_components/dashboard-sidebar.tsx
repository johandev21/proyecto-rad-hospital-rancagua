import { Home, CalendarClock } from "lucide-react";

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
    name: "Dr. Apellido - Jefe Medicina",
    email: "jefe.medicina@hospital.cl",
    avatar: "/avatars/doctor-avatar.png",
  },
];

const items: Item[] = [
  {
    title: "Inicio",
    url: "/jefe-servicio/dashboard",
    icon: Home,
  },
  {
    title: "Horario de Rotaciones",
    url: "/jefe-servicio/dashboard/rotaciones",
    icon: CalendarClock,
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
