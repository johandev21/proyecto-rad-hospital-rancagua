import { SidebarProvider } from "@/components/ui/sidebar";
import { DashboardSidebar } from "./_components/dashboard-sidebar";
import DashboardHeader from "@/app/dashboard/_components/dashboard-header";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-muted/40">
      <SidebarProvider>
        <DashboardSidebar />

        <main className="flex flex-1 flex-col">
          <DashboardHeader />

          <div className="w-full flex-1 mx-auto max-w-[1584px]">{children}</div>
        </main>
      </SidebarProvider>
    </div>
  );
}
