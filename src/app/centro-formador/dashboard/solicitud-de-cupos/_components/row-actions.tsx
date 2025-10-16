"use client";

import { Row } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { MoreHorizontal, Pencil, Trash2 } from "lucide-react";
import { SolicitudCentroFormador } from "./data";
import { FormularioSolicitud } from "./formulario-solicitud";
import { useState } from "react";

interface RowActionsProps {
  row: Row<SolicitudCentroFormador>;
}

export function RowActions({ row }: RowActionsProps) {
  // Solo renderiza las acciones si el estado es "Pendiente"
  if (row.original.status !== "Pendiente") {
    return null;
  }

  // Estados para controlar la apertura/cierre de los diálogos desde el menú
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  return (
    <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Abrir menú</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Acciones</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DialogTrigger asChild>
              <DropdownMenuItem>
                <Pencil className="mr-2 h-4 w-4" />
                Editar
              </DropdownMenuItem>
            </DialogTrigger>
            <AlertDialogTrigger asChild>
              <DropdownMenuItem className="text-red-600 focus:text-red-600 focus:bg-red-50">
                <Trash2 className="mr-2 h-4 w-4" />
                Eliminar
              </DropdownMenuItem>
            </AlertDialogTrigger>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Contenido del Diálogo de Edición */}
        <DialogContent className="sm:max-w-4xl">
          <DialogHeader>
            <DialogTitle>Editar Solicitud de Cupos</DialogTitle>
            <DialogDescription>
              Modifique los datos de la solicitud y guarde los cambios.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <FormularioSolicitud 
              solicitud={row.original} 
              onSuccess={() => setIsEditDialogOpen(false)}
            />
          </div>
        </DialogContent>

        {/* Contenido del Diálogo de Eliminación */}
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>¿Está absolutamente seguro?</AlertDialogTitle>
            <AlertDialogDescription>
              Esta acción no se puede deshacer. Esto eliminará permanentemente la solicitud de los servidores.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction 
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              onClick={() => console.log(`Solicitud ${row.original.id} eliminada`)}
            >
              Sí, eliminar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Dialog>
  );
}