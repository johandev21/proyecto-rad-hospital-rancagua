"use client";

import { ColumnDef } from "@tanstack/react-table";
import { AsistenciaReporte } from "./data";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export const columns: ColumnDef<AsistenciaReporte>[] = [
  { accessorKey: "fecha", header: "Fecha" },
  {
    accessorKey: "alumno",
    header: "Alumno",
    cell: ({ row }) => <div>{row.original.alumno.nombre}</div>,
  },
  {
    accessorKey: "institucion",
    header: "Institución",
    cell: ({ row }) => <div>{row.original.alumno.institucion}</div>,
  },
  { accessorKey: "servicioClinico", header: "Servicio Clínico" },
  {
    accessorKey: "estado",
    header: "Estado",
    cell: ({ row }) => {
      const estado = row.getValue("estado") as string;
      return (
        <Badge
          className={cn(
            "capitalize",
            estado === "Presente" && "bg-green-100 text-green-800",
            estado === "Ausente" && "bg-red-100 text-red-800",
            estado === "Justificado" && "bg-yellow-100 text-yellow-800"
          )}
        >
          {estado}
        </Badge>
      );
    },
  },
];
