"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Solicitud } from "./data";
import { Button } from "@/components/ui/button";
import { ArrowUpDown, ChevronDown, ChevronRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { StatusActions } from "./status-actions";

export const columns: ColumnDef<Solicitud>[] = [
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
      ) : null;
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
    accessorKey: "institucion",
    header: "Institución",
    filterFn: (row, id, value) => {
        return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: "numeroCupos",
    header: "N° de Cupos",
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
          className={cn(status === "Aprobada" && "bg-green-500 text-white")}
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
    header: () => <div className="text-center">Acciones</div>,
    cell: () => <StatusActions />,
  },
];