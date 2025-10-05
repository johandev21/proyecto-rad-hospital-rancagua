"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Nomina } from "./data";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal, Pencil, Eye } from "lucide-react";
import { NominaFormModal } from "./nomina-form-modal";

export const columns: ColumnDef<Nomina>[] = [
  {
    accessorKey: "solicitudId",
    header: "ID Solicitud",
  },
  {
    accessorKey: "servicioClinico",
    header: "Servicio Clínico",
  },
  {
    id: "alumnos",
    header: () => (
      <div className="text-center">Alumnos (Enviados/Aprobados)</div>
    ),
    cell: ({ row }) => {
      const nomina = row.original;
      return (
        <div className="text-center">
          {nomina.alumnos.length} / {nomina.cuposAprobados}
        </div>
      );
    },
  },
  {
    accessorKey: "estado",
    header: "Estado de Nómina",
    cell: ({ row }) => {
      const estado = row.getValue("estado") as string;
      return (
        <Badge
          variant={
            estado === "Devuelta con Observaciones"
              ? "destructive"
              : "secondary"
          }
          className={cn(
            "capitalize whitespace-nowrap",
            estado === "Aprobada" && "bg-green-100 text-green-800",
            estado === "Pendiente de Revisión" &&
              "bg-yellow-100 text-yellow-800"
          )}
        >
          {estado}
        </Badge>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const nomina = row.original;
      const isEditable =
        nomina.estado === "Pendiente de Revisión" ||
        nomina.estado === "Devuelta con Observaciones";

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

              <NominaFormModal nomina={nomina}>
                <div
                  className={cn(
                    "relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors hover:bg-muted",
                    !isEditable && "opacity-50 cursor-not-allowed"
                  )}
                  onClick={(e) => !isEditable && e.preventDefault()}
                >
                  <Pencil className="mr-2 h-4 w-4" />
                  Editar Nómina
                </div>
              </NominaFormModal>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      );
    },
  },
];
