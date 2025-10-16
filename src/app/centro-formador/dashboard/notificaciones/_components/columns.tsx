"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowUpDown, MoreHorizontal, AlertCircle, CheckCircle2, Info, Bell } from "lucide-react";
import { Notificacion } from "./data";
import { formatDistanceToNow } from 'date-fns';
import { es } from 'date-fns/locale';
import { cn } from "@/lib/utils";

const typeIcons = {
  Aprobacion: <CheckCircle2 className="h-4 w-4 text-green-500" />,
  Rechazo: <AlertCircle className="h-4 w-4 text-red-500" />,
  Informacion: <Info className="h-4 w-4 text-blue-500" />,
  Recordatorio: <Bell className="h-4 w-4 text-yellow-500" />,
};

export const columns: ColumnDef<Notificacion>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && "indeterminate")}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Seleccionar todo"
        className="translate-y-[2px]"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Seleccionar fila"
        className="translate-y-[2px]"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    id: "main",
    accessorFn: (row) => `${row.titulo} ${row.descripcion}`,
    header: "Notificación",
    cell: ({ row }) => {
      const notif = row.original;
      return (
        <div className="flex items-start gap-4 cursor-pointer">
          <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted flex-shrink-0 mt-1">
             {typeIcons[notif.tipo]}
          </span>
          <div className="flex flex-col">
            <span className={cn("font-semibold", !notif.leida && "text-foreground")}>
              {notif.titulo}
            </span>
            <span className="text-sm text-muted-foreground truncate max-w-sm">
              {notif.descripcion}
            </span>
          </div>
          {!notif.leida && (
             <span className="h-2 w-2 rounded-full bg-primary mt-1.5 flex-shrink-0" title="No leída"></span>
          )}
        </div>
      );
    },
  },
  {
    accessorKey: "tipo",
    header: "Tipo",
    cell: ({ row }) => <Badge variant="outline">{row.original.tipo}</Badge>,
  },
  {
    accessorKey: "leida",
    header: () => null,
    cell: () => null,
  },
  {
    accessorKey: "fecha",
    header: ({ column }) => (
      <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
        Fecha <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => {
       const date = new Date(row.original.fecha);
       return (
          <div className="text-muted-foreground text-xs whitespace-nowrap">
             {formatDistanceToNow(date, { addSuffix: true, locale: es })}
          </div>
       );
    },
  },
  {
    id: "actions",
    cell: () => (
      <Button variant="ghost" size="icon" className="h-8 w-8">
        <MoreHorizontal className="h-4 w-4" />
      </Button>
    ),
  },
];