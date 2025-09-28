"use client";

import { ColumnDef } from "@tanstack/react-table";
import { OcupacionReporte } from "./data";
import { Progress } from "@/components/ui/progress";

export const columns: ColumnDef<OcupacionReporte>[] = [
  {
    accessorKey: "servicio",
    header: "Servicio Clínico",
  },
  {
    accessorKey: "capacidadTotal",
    header: () => <div className="text-right">Capacidad</div>,
    cell: ({ row }) => <div className="text-right">{row.getValue("capacidadTotal")}</div>,
  },
  {
    accessorKey: "alumnosAsignados",
    header: () => <div className="text-right">Alumnos</div>,
    cell: ({ row }) => <div className="text-right">{row.getValue("alumnosAsignados")}</div>,
  },
  {
    accessorKey: "horasFormativas",
    header: () => <div className="text-right">Horas</div>,
    cell: ({ row }) => <div className="text-right">{row.getValue("horasFormativas")}</div>,
  },
  {
    accessorKey: "ocupacion",
    header: "Ocupación (%)",
    cell: ({ row }) => {
      const ocupacion = parseFloat(row.getValue("ocupacion"));
      return (
        <div className="flex items-center gap-2">
          <Progress value={ocupacion} className="w-2/3" />
          <span className="text-sm font-medium">{ocupacion.toFixed(1)}%</span>
        </div>
      );
    },
  },
];