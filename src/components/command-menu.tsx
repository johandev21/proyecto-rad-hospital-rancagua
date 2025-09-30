"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import {
  Calendar, Home, FilePlus, Settings, Users, BookOpen, ClipboardList, Coins, FileText, BarChart2
} from "lucide-react";

// Reutilizamos la misma estructura de datos del sidebar para mantener la consistencia
const navigationItems = [
  { title: "Inicio", url: "/dashboard", icon: Home },
  { title: "Capacidad Formadora", url: "/dashboard/capacidad-formadora", icon: Users },
  { title: "Solicitud de Cupos", url: "/dashboard/solicitud-de-cupos", icon: FilePlus },
  { title: "Programación", url: "/dashboard/programacion", icon: Calendar },
  { title: "Registro de Alumnos", url: "/dashboard/registro-de-alumnos", icon: BookOpen },
  { title: "Asistencia", url: "/dashboard/asistencia", icon: ClipboardList },
  { title: "Retribuciones", url: "/dashboard/retribuciones", icon: Coins },
  { title: "Documentos", url: "/dashboard/documentos", icon: FileText },
  { title: "Reportes", url: "/dashboard/reportes", icon: BarChart2 },
  { title: "Configuración", url: "/dashboard/configuracion", icon: Settings },
];

export function CommandMenu() {
  const [open, setOpen] = React.useState(false);
  const router = useRouter();

  // 1. Hook para escuchar el atajo de teclado global
  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  // 2. Función para manejar la selección de un ítem
  const runCommand = (command: () => unknown) => {
    setOpen(false);
    command();
  };

  return (
    <CommandDialog open={open} onOpenChange={setOpen}>
      <CommandInput placeholder="Escriba un comando o busque una página..." />
      <CommandList>
        <CommandEmpty>No se encontraron resultados.</CommandEmpty>
        
        <CommandGroup heading="Navegación">
          {navigationItems.map((item) => (
            <CommandItem
              key={item.url}
              value={item.title}
              onSelect={() => {
                runCommand(() => router.push(item.url));
              }}
            >
              <item.icon className="mr-2 h-4 w-4" />
              <span>{item.title}</span>
            </CommandItem>
          ))}
        </CommandGroup>
        
        {/* Puedes añadir más grupos aquí en el futuro */}
        <CommandSeparator />
        
        <CommandGroup heading="Acciones">
            {/* Ejemplo de una acción que no es de navegación */}
            <CommandItem onSelect={() => console.log("Imprimiendo...")}>
                <span>Imprimir Página</span>
            </CommandItem>
        </CommandGroup>

      </CommandList>
    </CommandDialog>
  );
}