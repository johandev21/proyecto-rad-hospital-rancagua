"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Usuario, roles } from "./data";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { RowActions } from "./row-actions";

export const columns: ColumnDef<Usuario>[] = [
  {
    accessorKey: "nombre",
    header: "Nombre",
    cell: ({ row }) => {
      const usuario = row.original;
      return (
        <div className="flex items-center gap-3">
          <Avatar className="h-9 w-9"><AvatarFallback>{usuario.nombre.split(" ").map(n => n[0]).join("").substring(0,2)}</AvatarFallback></Avatar>
          <div>
            <div className="font-medium">{usuario.nombre}</div>
            <div className="text-sm text-muted-foreground">{usuario.correo}</div>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "rol",
    header: "Rol",
    cell: ({ row }) => {
      return (
        <Select defaultValue={row.getValue("rol")}>
          <SelectTrigger className="w-[140px] h-8 text-xs">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {roles.map(rol => <SelectItem key={rol} value={rol}>{rol}</SelectItem>)}
          </SelectContent>
        </Select>
      );
    }
  },
  {
    accessorKey: "estado",
    header: "Estado",
    cell: ({ row }) => {
      return (
        <div className="flex items-center gap-2">
            <Switch defaultChecked={row.getValue("estado") === "Activo"} />
            <span>{row.getValue("estado")}</span>
        </div>
      );
    }
  },
  { accessorKey: "fechaCreacion", header: "Fecha de Creación" },
  { id: "actions", cell: ({ row }) => <RowActions usuario={row.original} /> },
];