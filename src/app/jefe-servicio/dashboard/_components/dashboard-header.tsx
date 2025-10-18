"use client";

import { useId, useState, useEffect } from "react";
import { SearchIcon, Home, CalendarClock } from "lucide-react";
import { useRouter } from "next/navigation";

import NotificationMenu from "@/components/notification-menu";
import { Input } from "@/components/ui/input";
import { Popover } from "@/components/ui/popover";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { ModeToggle } from "@/components/mode-toggler";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Kbd } from "@/components/ui/kbd";
import { InputGroupAddon } from "@/components/ui/input-group";

const navigationItems = [
  { title: "Inicio", url: "/jefe-servicio/dashboard", icon: Home },
  {
    title: "Horario de Rotaciones",
    url: "/jefe-servicio/dashboard/rotaciones",
    icon: CalendarClock,
  },
];

export default function DashboardHeader() {
  const id = useId();
  const [commandMenuOpen, setCommandMenuOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setCommandMenuOpen((open) => !open);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const runCommand = (url: string) => {
    setCommandMenuOpen(false);
    router.push(url);
  };

  return (
    <>
      <header className="border-b bg-header px-4 md:px-6 sticky inset-0 z-50 backdrop-blur-lg">
        <div className="flex h-16 items-center justify-between gap-4">
          <div className="flex flex-1 items-center gap-2">
            <Popover />
            <div className="flex items-center">
              <SidebarTrigger />
            </div>
          </div>

          <div className="grow">
            <div className="relative mx-auto w-full max-w-xs">
              <Input
                id={id}
                className="peer h-8 ps-8 pe-10 text-xs md:text-sm bg-card border-none"
                placeholder="Buscar Módulos..."
                type="search"
                onFocus={() => setCommandMenuOpen(true)}
              />
              <div className="text-muted-foreground/80 pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-2 peer-disabled:opacity-50">
                <SearchIcon size={16} />
              </div>
              <div className="text-muted-foreground pointer-events-none absolute inset-y-0 end-0 flex items-center justify-center pe-0.5">
                <InputGroupAddon align="inline-end" className="gap-1">
                  <Kbd className="border">Ctrl + K</Kbd>
                </InputGroupAddon>
              </div>
            </div>
          </div>

          <div className="flex flex-1 items-center justify-end gap-2">
            <ModeToggle />
            <NotificationMenu />
          </div>
        </div>
      </header>

      <CommandDialog open={commandMenuOpen} onOpenChange={setCommandMenuOpen}>
        <CommandInput placeholder="Escriba un módulo..." />
        <CommandList>
          <CommandEmpty>No se encontraron módulos.</CommandEmpty>
          <CommandGroup heading="Navegación Rápida">
            {navigationItems.map((item) => (
              <CommandItem
                key={item.url}
                value={item.title}
                onSelect={() => runCommand(item.url)}
              >
                <item.icon className="mr-2 h-4 w-4" />
                <span>{item.title}</span>
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
}
