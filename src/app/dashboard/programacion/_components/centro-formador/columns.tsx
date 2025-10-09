"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Rotacion } from "./data";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export const columns: ColumnDef<Rotacion>[] = [
  {
    accessorKey: "alumno",
    header: "Alumno",
    cell: ({ row }) => {
      const alumno = row.original.alumno;
      return (
        <div className="flex items-center gap-3">
          <Avatar className="h-9 w-9">
            <AvatarFallback>
              {alumno.nombre
                .split(" ")
                .map((n) => n[0])
                .join("")
                .substring(0, 2)}
            </AvatarFallback>
          </Avatar>
          <div>
            <div className="font-medium">{alumno.nombre}</div>
            <div className="text-sm text-muted-foreground">
              {/* No mostramos la institución, ya que es la del propio usuario */}
            </div>
          </div>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      const alumno = row.original.alumno.nombre.toLowerCase();
      const searchTerm = String(value).toLowerCase();
      return alumno.includes(searchTerm);
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
    id: "periodo",
    header: "Período de Rotación",
    cell: ({ row }) =>
      `${row.original.fechaInicio} al ${row.original.fechaTermino}`,
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
            estado === "En Curso" && "bg-blue-100 text-blue-800",
            estado === "Finalizada" && "text-muted-foreground"
          )}
        >
          {estado}
        </Badge>
      );
    },
  },
];
