"use client";

import { ColumnDef } from "@tanstack/react-table";
import { RotacionReporte } from "./data";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export const columns: ColumnDef<RotacionReporte>[] = [
  {
    accessorKey: "alumno",
    header: "Alumno",
    cell: ({ row }) => {
      const alumno = row.original.alumno;
      return (
        <div className="flex items-center gap-3">
          <Avatar className="h-9 w-9"><AvatarFallback>{alumno.nombre.split(" ").map(n => n[0]).join("").substring(0,2)}</AvatarFallback></Avatar>
          <div>
            <div className="font-medium">{alumno.nombre}</div>
            <div className="text-sm text-muted-foreground">{alumno.institucion}</div>
          </div>
        </div>
      );
    },
  },
  { accessorKey: "carrera", header: "Carrera" },
  { accessorKey: "servicioClinico", header: "Servicio Clínico" },
  { accessorKey: "fechaInicio", header: "Período" , cell: ({ row }) => `${row.original.fechaInicio} - ${row.original.fechaTermino}`},
  {
    accessorKey: "estado",
    header: "Estado",
    cell: ({ row }) => {
      const estado = row.getValue("estado") as string;
      return (
        <Badge variant="outline" className={cn("capitalize", estado === "En Curso" && "bg-blue-100 text-blue-800", estado === "Finalizada" && "text-muted-foreground")}>
          {estado}
        </Badge>
      );
    }
  },
];