"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Solicitud } from "./data";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { 
  MoreHorizontal, 
  Pencil, 
  Trash2, 
  Eye, 
  ChevronDown, 
  ChevronRight 
} from "lucide-react";

export const columns: ColumnDef<Solicitud>[] = [
  {
    id: "expander",
    header: () => null, 
    cell: ({ row }) => {
      if (!row.getCanExpand()) {
        return null;
      }

      return (
        <Button
          variant="ghost"
          size="icon"
          onClick={row.getToggleExpandedHandler()} 
          className="h-8 w-8"
        >
          {row.getIsExpanded() ? (
            <ChevronDown className="h-4 w-4" />
          ) : (
            <ChevronRight className="h-4 w-4" />
          )}
          <span className="sr-only">Toggle row</span>
        </Button>
      );
    },
  },
  { 
    accessorKey: "servicioClinico", 
    header: "Servicio Clínico" 
  },
  { 
    accessorKey: "numeroCupos", 
    header: "N° Cupos" 
  },
  { 
    accessorKey: "fechaInicio", 
    header: "Fecha Inicio" 
  },
  { 
    accessorKey: "fechaTermino", 
    header: "Fecha Término" 
  },
  {
    accessorKey: "status",
    header: "Estado",
    cell: ({ row }) => {
      const status = row.getValue("status") as string;
      return (
        <Badge
          variant={status === "Rechazada" ? "destructive" : "secondary"}
          className={cn(
            status === "Aprobada" && "bg-green-100 text-green-800",
            status === "Pendiente" && "bg-yellow-100 text-yellow-800"
          )}
        >
          {status}
        </Badge>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const solicitud = row.original;
      const isRejected = solicitud.status === "Rechazada";

      return (
        <div className="text-right">
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuItem>
                      <Eye className="mr-2 h-4 w-4" />
                      Ver Detalles
                    </DropdownMenuItem>
                    <DropdownMenuItem disabled={!isRejected}>
                        <Pencil className="mr-2 h-4 w-4" />
                        Modificar
                    </DropdownMenuItem>
                    <DropdownMenuItem className="text-destructive">
                      <Trash2 className="mr-2 h-4 w-4" />
                      Retirar
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
      );
    },
  },
];