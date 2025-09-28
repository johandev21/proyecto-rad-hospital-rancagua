"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import { Rotacion } from "./data";
import { RowActions } from "./row-actions";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export const columns: ColumnDef<Rotacion>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Seleccionar todo"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Seleccionar fila"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "alumno",
    header: "Alumno",
    cell: ({ row }) => {
      const alumno = row.original.alumno;
      return (
        <div className="flex items-center gap-3">
          <Avatar className="h-9 w-9">
            <AvatarFallback>
              {alumno.nombre.split(" ").map(n => n[0]).join("").substring(0,2)}
            </AvatarFallback>
          </Avatar>
          <div>
            <div className="font-medium">{alumno.nombre}</div>
            <div className="text-sm text-muted-foreground">{alumno.institucion}</div>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "servicioClinico",
    header: "Servicio Clínico",
  },
  {
    accessorKey: "tutor",
    header: "Tutor Asignado",
  },
  {
    accessorKey: "fechaInicio",
    header: "Período de Rotación",
    cell: ({ row }) => {
        return (
            <div>
                {row.original.fechaInicio} al {row.original.fechaTermino}
            </div>
        )
    }
  },
  {
    accessorKey: "estado",
    header: "Estado",
    cell: ({ row }) => {
        const estado = row.getValue("estado") as string;
        return (
            <Badge
                variant="outline"
                className={cn(
                    "capitalize",
                    estado === "En Curso" && "bg-blue-100 text-blue-800 border-blue-300 dark:bg-blue-900/40 dark:text-blue-300 dark:border-blue-700",
                    estado === "Finalizada" && "text-muted-foreground",
                )}
            >
                {estado}
            </Badge>
        )
    }
  },
  {
    id: "actions",
    cell: () => <RowActions />,
  },
];