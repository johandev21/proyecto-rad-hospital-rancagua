"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ServicioClinico } from "./data";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { RowActions } from "./row-actions";

export const columns: ColumnDef<ServicioClinico>[] = [
  { accessorKey: "nombre", header: "Nombre del Servicio" },
  {
    accessorKey: "area",
    header: "Área",
    cell: ({ row }) => <Badge variant="outline">{row.getValue("area")}</Badge>,
  },
  {
    accessorKey: "capacidadPregrado",
    header: () => <div className="text-right">Capacidad Pregrado</div>,
    cell: ({ row }) => (
      <Input
        type="number"
        defaultValue={row.getValue("capacidadPregrado")}
        className="h-8 text-right"
      />
    ),
  },
  {
    accessorKey: "capacidadPostgrado",
    header: () => <div className="text-right">Capacidad Postgrado</div>,
    cell: ({ row }) => (
      <Input
        type="number"
        defaultValue={row.getValue("capacidadPostgrado")}
        className="h-8 text-right"
      />
    ),
  },
  {
    accessorKey: "estado",
    header: "Estado",
    cell: ({ row }) => (
      <div className="flex items-center gap-2">
        <Switch defaultChecked={row.getValue("estado") === "Activo"} />
        <span>{row.getValue("estado")}</span>
      </div>
    ),
  },
  { id: "actions", cell: ({ row }) => <RowActions servicio={row.original} /> },
];
