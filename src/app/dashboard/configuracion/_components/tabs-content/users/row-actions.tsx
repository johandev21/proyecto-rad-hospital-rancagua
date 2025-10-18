"use client";

import * as React from "react";
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
import { MoreHorizontal, Pencil, ToggleLeft, ToggleRight } from "lucide-react";
import { UserFormModal } from "./user-form-modal";
import { Usuario } from "./data";

interface RowActionsProps {
  usuario: Usuario;
}

export function RowActions({ usuario }: RowActionsProps) {
  const [isEditModalOpen, setIsEditModalOpen] = React.useState(false);
  const [isStatusAlertOpen, setIsStatusAlertOpen] = React.useState(false);

  const handleStatusToggle = () => {
    const newStatus = usuario.estado === "Activo" ? "Inactivo" : "Activo";
    console.log(`Cambiando estado de ${usuario.nombre} (${usuario.id}) a ${newStatus}`);
    setIsStatusAlertOpen(false);
  };

  return (
    <>
      <AlertDialog open={isStatusAlertOpen} onOpenChange={setIsStatusAlertOpen}>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
            >
              <MoreHorizontal className="h-4 w-4" />
              <span className="sr-only">Abrir menú</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-[180px]">
            <DropdownMenuLabel>Acciones</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onSelect={() => setIsEditModalOpen(true)}>
              <Pencil className="mr-2 h-4 w-4" />
              Editar Perfil
            </DropdownMenuItem>
            
            <AlertDialogTrigger asChild>
              <DropdownMenuItem className={usuario.estado === 'Activo' ? "text-yellow-600 focus:text-yellow-700 focus:bg-yellow-50" : "text-green-600 focus:text-green-700 focus:bg-green-50"}>
                {usuario.estado === "Activo" ? (
                  <ToggleLeft className="mr-2 h-4 w-4" />
                ) : (
                  <ToggleRight className="mr-2 h-4 w-4" />
                )}
                {usuario.estado === "Activo" ? "Desactivar" : "Activar"}
              </DropdownMenuItem>
            </AlertDialogTrigger>
          </DropdownMenuContent>
        </DropdownMenu>

        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirmar Cambio de Estado</AlertDialogTitle>
            <AlertDialogDescription>
              ¿Está seguro de que desea {usuario.estado === "Activo" ? "desactivar" : "activar"} al usuario{" "}
              <strong>{usuario.nombre}</strong>? 
              {usuario.estado === "Activo" 
                ? " El usuario ya no podrá iniciar sesión." 
                : " El usuario podrá volver a iniciar sesión."}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction 
              onClick={handleStatusToggle}
              className={usuario.estado === 'Activo' ? "bg-yellow-500 hover:bg-yellow-500/90 text-white" : "bg-green-500 hover:bg-green-500/90 text-white"}
            >
              Sí, {usuario.estado === "Activo" ? "Desactivar" : "Activar"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <UserFormModal 
         usuario={usuario} 
         isOpenProp={isEditModalOpen}
         onOpenChangeProp={setIsEditModalOpen} 
      >
        <></> 
      </UserFormModal>
    </>
  );
}