"use client";

import * as React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Usuario, roles } from "./data";

interface UserFormModalProps {
  usuario?: Usuario;
  children: React.ReactNode;
}

export function UserFormModal({ usuario, children }: UserFormModalProps) {
  const isEditing = !!usuario;
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>
            {isEditing ? "Editar Usuario" : "Crear Nuevo Usuario"}
          </DialogTitle>
          <DialogDescription>
            {isEditing
              ? "Modifique los detalles del perfil del usuario."
              : "Complete el formulario para añadir un nuevo usuario al sistema."}
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="nombre">Nombre Completo</Label>
            <Input id="nombre" defaultValue={usuario?.nombre} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="correo">Correo Electrónico</Label>
            <Input id="correo" type="email" defaultValue={usuario?.correo} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="rol">Rol</Label>
            <Select defaultValue={usuario?.rol}>
              <SelectTrigger>
                <SelectValue placeholder="Seleccione un rol" />
              </SelectTrigger>
              <SelectContent>
                {roles.map((r) => (
                  <SelectItem key={r} value={r}>
                    {r}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        <Button type="submit">
          {isEditing ? "Guardar Cambios" : "Crear Usuario"}
        </Button>
      </DialogContent>
    </Dialog>
  );
}
