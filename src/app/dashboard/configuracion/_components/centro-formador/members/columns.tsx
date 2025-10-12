"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Member, roles } from "./data";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MoreHorizontal, Trash2, Send } from "lucide-react";

const currentUserId = "MEM-001";

export const columns: ColumnDef<Member>[] = [
  {
    accessorKey: "nombre",
    header: "Nombre",
    cell: ({ row }) => (
      <div className="flex items-center gap-3">
        <Avatar className="h-9 w-9"><AvatarFallback>{row.original.nombre.split(" ").map(n => n[0]).join("").substring(0,2)}</AvatarFallback></Avatar>
        <div>
          <div className="font-medium">{row.original.nombre}</div>
          <div className="text-sm text-muted-foreground">{row.original.correo}</div>
        </div>
      </div>
    ),
  },
  {
    accessorKey: "rol",
    header: "Rol",
    cell: ({ row }) => {
      const isCurrentUser = row.original.id === currentUserId;
      return (
        <Select defaultValue={row.getValue("rol")} disabled={isCurrentUser}>
          <SelectTrigger className="w-[180px] h-8 text-xs">
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
    cell: ({ row }) => <Badge variant={row.getValue("estado") === "Invitado" ? "outline" : "default"}>{row.getValue("estado")}</Badge> 
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const member = row.original;
      const isCurrentUser = member.id === currentUserId;

      if (isCurrentUser) return null;

      return (
        <div className="text-right">
          <DropdownMenu>
            <DropdownMenuTrigger asChild><Button variant="ghost" className="h-8 w-8 p-0"><MoreHorizontal className="h-4 w-4" /></Button></DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {member.estado === 'Invitado' ? (
                <DropdownMenuItem><Send className="mr-2 h-4 w-4" />Reenviar Invitación</DropdownMenuItem>
              ) : (
                <DropdownMenuItem className="text-destructive"><Trash2 className="mr-2 h-4 w-4" />Eliminar Miembro</DropdownMenuItem>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      );
    },
  },
];