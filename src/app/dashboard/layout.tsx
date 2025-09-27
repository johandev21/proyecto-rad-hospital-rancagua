import { SidebarProvider } from "@/components/ui/sidebar";
import { DashboardSidebar } from "./_components/dashboard-sidebar";
import DashboardHeader from "./_components/dashboard-header";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen w-full">
      <SidebarProvider>
        <DashboardSidebar />
        <main className="flex z-0 flex-1 flex-col">
          <DashboardHeader />
          {children}
        </main>
      </SidebarProvider>
    </div>
  );
}
