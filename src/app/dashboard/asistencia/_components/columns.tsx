"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Asistencia } from "./data";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { AttendanceHistoryModal } from "./attendance-history-modal";
import { Button } from "@/components/ui/button";
import { CalendarDays } from "lucide-react";

export const columns: ColumnDef<Asistencia>[] = [
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
              {alumno.institucion}
            </div>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "servicioClinico",
    header: "Servicio Clínico",
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: "tutor",
    header: "Tutor Asignado",
  },
  {
    accessorKey: "estado",
    header: () => <div className="text-center">Estado de Asistencia</div>,
    cell: ({ row, table }) => {
      const estadoActual = row.getValue("estado") as Asistencia["estado"];

      const updateAttendance = (newStatus: Asistencia["estado"]) => {
        (table.options.meta as any)?.updateAttendance(row.index, newStatus);
      };

      return (
        <div className="flex justify-center">
          <ToggleGroup
            type="single"
            value={estadoActual}
            onValueChange={(value: Asistencia["estado"]) => {
              if (value) updateAttendance(value);
            }}
            className="h-8"
          >
            <ToggleGroupItem
              value="Presente"
              aria-label="Marcar como presente"
              className="px-2 text-xs h-full data-[state=on]:bg-green-100 data-[state=on]:text-green-800 dark:data-[state=on]:bg-green-900/40 dark:data-[state=on]:text-green-300"
            >
              Presente
            </ToggleGroupItem>
            <ToggleGroupItem
              value="Ausente"
              aria-label="Marcar como ausente"
              className="px-2 text-xs h-full data-[state=on]:bg-red-100 data-[state=on]:text-red-800 dark:data-[state=on]:bg-red-900/40 dark:data-[state=on]:text-red-300"
            >
              Ausente
            </ToggleGroupItem>
            <ToggleGroupItem
              value="Justificado"
              aria-label="Marcar como justificado"
              className="px-2 text-xs h-full data-[state=on]:bg-yellow-100 data-[state=on]:text-yellow-800 dark:data-[state=on]:bg-yellow-900/40 dark:data-[state=on]:text-yellow-300"
            >
              Justificado
            </ToggleGroupItem>
          </ToggleGroup>
        </div>
      );
    },
  },
  {
    id: "historial",
    header: () => <div className="text-center">Historial</div>,
    cell: ({ row }) => (
      <div className="flex justify-center">
        <AttendanceHistoryModal asistencia={row.original}>
          <Button variant="outline" size="icon" className="h-8 w-8">
            <CalendarDays className="h-4 w-4" />
            <span className="sr-only">Ver historial</span>
          </Button>
        </AttendanceHistoryModal>
      </div>
    ),
  },
];
