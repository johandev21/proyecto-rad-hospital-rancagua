"use client";

import { ColumnDef, FilterFn } from "@tanstack/react-table";
import { RotacionServicio } from "./data";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  ChevronDown,
  ChevronRight,
  Calendar,
  Users,
  Clock,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { DateRange } from "react-day-picker";
import { parse, startOfDay, endOfDay } from "date-fns";

const dateRangeFilterFn: FilterFn<RotacionServicio> = (
  row,
  columnId,
  filterValue: DateRange | undefined
) => {
  if (!filterValue || (!filterValue.from && !filterValue.to)) {
    return true;
  }

  const today = startOfDay(new Date()); 
  let startDate: Date | null = null;
  let endDate: Date | null = null;

  try {
    startDate = parse(row.original.fechaInicio, "dd/MM/yyyy", today);
    endDate = parse(row.original.fechaTermino, "dd/MM/yyyy", today);
  } catch (e) {
    console.error(
      "Error parsing dates for filtering:",
      row.original.fechaInicio,
      row.original.fechaTermino,
      e
    );
    return false;
  }

  if (!startDate || !endDate) return false;

  const filterFrom = filterValue.from ? startOfDay(filterValue.from) : null;
  const filterTo = filterValue.to ? endOfDay(filterValue.to) : null;

  if (filterFrom && filterTo) {
    return startDate <= filterTo && endDate >= filterFrom;
  }
  if (filterFrom) {
    return endDate >= filterFrom;
  }
  if (filterTo) {
    return startDate <= filterTo;
  }

  return true;
};

export const columns: ColumnDef<RotacionServicio>[] = [
  {
    id: "expander",
    header: () => null,
    cell: ({ row }) => (
      <Button
        variant="ghost"
        size="icon"
        onClick={row.getToggleExpandedHandler()}
        className="h-8 w-8"
        disabled={
          !row.original.alumnosAsignados ||
          row.original.alumnosAsignados.length === 0
        }
      >
        {row.getIsExpanded() ? (
          <ChevronDown className="h-4 w-4" />
        ) : (
          <ChevronRight className="h-4 w-4" />
        )}
      </Button>
    ),
    enableColumnFilter: false,
  },
  {
    accessorKey: "centroFormador",
    header: "Centro Formador",
    filterFn: "includesString",
  },
  {
    accessorKey: "carrera",
    header: "Carrera",
    filterFn: "includesString",
  },
  {
    id: "periodo",
    header: "Período",
    cell: ({ row }) => (
      <div className="flex items-center gap-2 text-sm text-muted-foreground whitespace-nowrap">
        <Calendar className="h-4 w-4" />
        {row.original.fechaInicio} - {row.original.fechaTermino}
      </div>
    ),
    filterFn: dateRangeFilterFn,
    enableColumnFilter: true,
  },
  {
    accessorKey: "numeroAlumnos",
    header: () => <div className="text-center">N° Alumnos</div>,
    cell: ({ row }) => (
      <div className="text-center">{row.original.numeroAlumnos}</div>
    ),
    enableColumnFilter: false,
  },
  {
    accessorKey: "tipoJornada",
    header: "Jornada",
    cell: ({ row }) => (
      <div className="flex items-center gap-2 text-sm whitespace-nowrap">
        <Clock className="h-4 w-4 text-muted-foreground" />
        {row.original.tipoJornada}
      </div>
    ),
    enableColumnFilter: false,
  },
  {
    accessorKey: "asignatura",
    header: "Asignatura",
    cell: ({ row }) =>
      row.original.asignatura || (
        <span className="text-muted-foreground italic">N/A</span>
      ),
    enableColumnFilter: false,
  },
  {
    accessorKey: "estado",
    header: "Estado",
    cell: ({ row }) => {
      const estado = row.getValue("estado") as string;
      return (
        <Badge
          variant={
            estado === "En Curso"
              ? "default"
              : estado === "Finalizada"
              ? "outline"
              : "secondary"
          }
          className={cn(
            "text-xs font-medium",
            estado === "En Curso" &&
              "bg-blue-100 text-blue-800 border-blue-200",
            estado === "Finalizada" && "border-gray-300",
            estado === "Programada" &&
              "bg-yellow-100 text-yellow-800 border-yellow-200"
          )}
        >
          {estado}
        </Badge>
      );
    },
    filterFn: "equalsString", 
  },
];
