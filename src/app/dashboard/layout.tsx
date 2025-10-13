import { SidebarProvider } from "@/components/ui/sidebar";
import DashboardHeader from "@/app/dashboard/_components/dashboard-header";
import React from "react";
import { DashboardSidebarRAD } from "./_components/dashboard-sidebar-rad";

export default async function Layout({ children }: { children: React.ReactNode }) {

  return (
    <div className="flex min-h-screen">
      <SidebarProvider>
        <DashboardSidebarRAD />
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