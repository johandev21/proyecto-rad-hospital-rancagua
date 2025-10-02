"use client";

import { useId, useState, useEffect } from "react";
import {
  SearchIcon,
  Home,
  Calendar,
  FilePlus,
  Settings,
  Users,
  BookOpen,
  ClipboardList,
  Coins,
  FileText,
  BarChart2,
} from "lucide-react";
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

const navigationItems = [
  { title: "Inicio", url: "/dashboard", icon: Home },
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
  { title: "Programación", url: "/dashboard/programacion", icon: Calendar },
  {
    title: "Registro de Alumnos",
    url: "/dashboard/registro-de-alumnos",
    icon: BookOpen,
  },
  { title: "Asistencia", url: "/dashboard/asistencia", icon: ClipboardList },
  { title: "Retribuciones", url: "/dashboard/retribuciones", icon: Coins },
  { title: "Documentos", url: "/dashboard/documentos", icon: FileText },
  { title: "Reportes", url: "/dashboard/reportes", icon: BarChart2 },
  { title: "Configuración", url: "/dashboard/configuracion", icon: Settings },
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
            <Popover></Popover>
            <div className="flex items-center">
              <SidebarTrigger />
            </div>
          </div>

          <div className="grow">
            <div className="relative mx-auto w-full max-w-xs">
              <Input
                id={id}
                className="peer h-8 ps-8 pe-10 text-xs md:text-sm border-foreground/30"
                placeholder="Buscar Módulos o Acciones..."
                type="search"
                onFocus={() => setCommandMenuOpen(true)}
              />
              <div className="text-muted-foreground/80 pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-2 peer-disabled:opacity-50">
                <SearchIcon size={16} />
              </div>
              <div className="text-muted-foreground pointer-events-none absolute inset-y-0 end-0 flex items-center justify-center pe-2">
                <kbd className="text-muted-foreground/70 inline-flex h-5 max-h-full items-center rounded border px-1 font-[inherit] text-[0.625rem] font-medium">
                  ⌘K
                </kbd>
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
        <CommandInput placeholder="Escriba un módulo o acción..." />
        <CommandList>
          <CommandEmpty>No se encontraron módulos o acciones.</CommandEmpty>

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
