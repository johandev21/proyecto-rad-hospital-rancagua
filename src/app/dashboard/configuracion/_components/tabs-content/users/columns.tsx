"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowUpDown } from "lucide-react";
import { Usuario } from "./data";
import { RowActions } from "./row-actions"; 
import { cn } from "@/lib/utils";

export const columns: ColumnDef<Usuario>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && "indeterminate")}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Seleccionar todo"
        className="translate-y-[2px]"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Seleccionar fila"
        className="translate-y-[2px]"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "nombre",
    header: ({ column }) => (
      <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
        Usuario <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => (
        <div className="flex flex-col">
            <span className="font-medium">{row.original.nombre}</span>
            <span className="text-xs text-muted-foreground">{row.original.correo}</span>
        </div>
    ),
  },
  {
    accessorKey: "rol",
    header: "Rol",
    cell: ({ row }) => {
        const rol = row.original.rol;
        let variant: "default" | "secondary" | "outline" = "outline";
        if (rol === "Administrador RAD") variant = "default";
        if (rol === "Coordinador CF") variant = "secondary";
        return <Badge variant={variant}>{rol}</Badge>
    },
    filterFn: "equalsString", 
  },
  {
      accessorKey: "entidadAsociada",
      header: "Entidad Asociada",
      cell: ({ row }) => (
          row.original.entidadAsociada || <span className="text-muted-foreground italic">-</span>
      ),
      filterFn: "includesString",
  },
  {
    accessorKey: "estado",
    header: "Estado",
    cell: ({ row }) => {
      const estado = row.original.estado;
      return (
        <Badge
          variant={estado === "Activo" ? "default" : "destructive"}
          className={cn(estado === "Activo" && "bg-green-100 text-green-800 border-green-200")}
        >
          {estado}
        </Badge>
      );
    },
     filterFn: "equalsString",
  },
  {
    accessorKey: "fechaCreacion",
    header: "Fecha Creación",
     cell: ({ row }) => {
        return <span className="text-sm text-muted-foreground">{row.original.fechaCreacion}</span>
     }
  },
  {
    id: "actions",
    cell: ({ row }) => <RowActions usuario={row.original} />,
  },
];