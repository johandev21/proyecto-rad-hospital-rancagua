"use client";

import { ColumnDef } from "@tanstack/react-table";
import { SolicitudCentroFormador } from "./data";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { RowActions } from "./row-actions"; // Importar el nuevo componente

export const columns: ColumnDef<SolicitudCentroFormador>[] = [
  {
    id: "expander",
    header: () => null,
    cell: ({ row }) => {
      return row.getCanExpand() ? (
        <Button
          variant="ghost"
          size="icon"
          onClick={row.getToggleExpandedHandler()}
          className="h-8 w-8"
        >
          {row.getIsExpanded() ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
        </Button>
      ) : (
        <span className="inline-block w-8"></span>
      );
    },
  },
  {
    accessorKey: "carrera",
    header: "Carrera",
  },
  {
    accessorKey: "añoFormacion",
    header: "Año de Formación",
  },
  {
    accessorKey: "tipoPractica",
    header: "Tipo de Práctica",
  },
  {
    accessorKey: "servicioClinico",
    header: "Servicio Clínico",
  },
  {
    accessorKey: "numeroCupos",
    header: "N° de Cupos",
  },
  {
    accessorKey: "tipoJornada",
    header: "Tipo de Jornada",
  },
  {
    accessorKey: "numeroAlumnos",
    header: "N° de Alumnos",
  },
  {
    accessorKey: "asignatura",
    header: "Asignatura",
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
    accessorKey: "status",
    header: "Estado",
    cell: ({ row }) => {
      const status = row.getValue("status") as string;
      return (
        <Badge
          variant={
            status === "Aprobada" ? "default" : status === "Rechazada" ? "destructive" : "secondary"
          }
          className={cn(
            "text-xs font-medium",
            status === "Aprobada" && "bg-green-100 text-green-800 border-green-200",
            status === "Rechazada" && "bg-red-100 text-red-800 border-red-200",
            status === "Pendiente" && "bg-yellow-100 text-yellow-800 border-yellow-200"
          )}
        >
          {status}
        </Badge>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    }
  },
  {
    id: "actions",
    cell: ({ row }) => <RowActions row={row} />, // Usar el componente RowActions
  },
];