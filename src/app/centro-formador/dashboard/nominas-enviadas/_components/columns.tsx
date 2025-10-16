"use client";

import { ColumnDef } from "@tanstack/react-table";
import { NominaEnviada } from "./data";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

export const columns: ColumnDef<NominaEnviada>[] = [
  {
    id: "expander",
    header: () => null,
    cell: ({ row }) => (
      <Button
        variant="ghost"
        size="icon"
        onClick={row.getToggleExpandedHandler()}
        className="h-8 w-8"
      >
        {row.getIsExpanded() ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
      </Button>
    ),
  },
  {
    accessorKey: "id",
    header: "ID Nómina",
  },
  {
    accessorKey: "servicioClinico",
    header: "Servicio Clínico",
  },
  {
    accessorKey: "carrera",
    header: "Carrera",
  },
  {
    accessorKey: "numeroAlumnos",
    header: "N° Alumnos",
    cell: ({ row }) => <div className="text-center">{row.original.numeroAlumnos}</div>,
  },
  {
    accessorKey: "fechaInicio",
    header: "Fecha Inicio",
  },
  {
    accessorKey: "fechaTermino",
    header: "Fecha Término",
  },
  {
    accessorKey: "estadoRAD",
    header: "Estado RAD",
    cell: ({ row }) => {
      const status = row.getValue("estadoRAD") as string;
      return (
        <Badge
          className={cn(
            "text-xs font-medium",
            status === "Aprobada Final" && "bg-green-100 text-green-800 border-green-200",
            status === "En Revisión" && "bg-blue-100 text-blue-800 border-blue-200",
            status === "Recibida" && "bg-gray-100 text-gray-800 border-gray-200"
          )}
        >
          {status}
        </Badge>
      );
    },
  },
];