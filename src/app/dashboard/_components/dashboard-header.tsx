import { Bell, Search } from "lucide-react";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SidebarTrigger } from "@/components/ui/sidebar";

export default function DashboardHeader() {
  return (
    <header className="flex sticky inset-0 z-100 h-16 items-center justify-between border-b bg-header/80 shadow-xl dark:shadow-none dark:bg-inherit backdrop-blur-sm px-4 sm:px-6">
      <div className="flex gap-2">
        <SidebarTrigger />
        <h1 className="font-semibold tracking-tight">Dashboard</h1>
      </div>

      <div className="flex w-full items-center gap-4 md:ml-auto md:w-auto">
        <div className="relative w-full flex-1 md:grow-0">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Buscar"
            className="w-full rounded-lg border-border bg-input pl-8 md:w-[200px] lg:w-[330px]"
          />
        </div>

        <Button variant="ghost" size="icon" className="rounded-full">
          <Bell className="h-5 w-5" />
          <span className="sr-only">Ver notificaciones</span>
        </Button>

        <Avatar className="h-9 w-9">
          {/* <AvatarImage src="/url-de-la-imagen.png" alt="Avatar" /> */}
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </div>
    </header>
  );
}
