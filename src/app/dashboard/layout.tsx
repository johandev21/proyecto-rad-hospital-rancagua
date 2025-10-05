import { SidebarProvider } from "@/components/ui/sidebar";
import DashboardHeader from "@/app/dashboard/_components/dashboard-header";
import React from "react";
import { DashboardSidebarRAD } from "./_components/dashboard-sidebar-rad";
import { DashboardSidebarCentro } from "./_components/dashboard-sidebar-centro";
import { DashboardSidebarJefe } from "./_components/dashboard-sidebar-jefe";

type UserRole = "RAD" | "CentroFormador" | "JefeServicio";

async function getUserSession(): Promise<UserRole> {
  return "CentroFormador"; 
}

const sidebars: Record<UserRole, React.JSX.Element> = {
  "RAD": <DashboardSidebarRAD />,
  "CentroFormador": <DashboardSidebarCentro />,
  "JefeServicio": <DashboardSidebarJefe />,
};

export default async function Layout({ children }: { children: React.ReactNode }) {
  const userRole = await getUserSession();
  
  const CurrentSidebar = sidebars[userRole] || null;

  return (
    <div className="flex min-h-screen">
      <SidebarProvider>
        {CurrentSidebar} 
        <main className="flex z-0 flex-1 flex-col min-w-0">
          <DashboardHeader />
          <div className="w-full flex-1 mx-auto max-w-[1584px]">
            {children}
          </div>
        </main>
      </SidebarProvider>
    </div>
  );
}