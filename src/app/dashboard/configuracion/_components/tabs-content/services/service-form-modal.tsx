"use client";

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
import { ServicioClinico, areas } from "./data";

interface ServiceFormModalProps {
  servicio?: ServicioClinico;
  children: React.ReactNode;
}

export function ServiceFormModal({
  servicio,
  children,
}: ServiceFormModalProps) {
  const isEditing = !!servicio;
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>
            {isEditing ? "Editar Servicio" : "Crear Nuevo Servicio"}
          </DialogTitle>
          <DialogDescription>
            Complete los detalles del servicio clínico.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="nombre">Nombre del Servicio</Label>
            <Input id="nombre" defaultValue={servicio?.nombre} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="area">Área</Label>
            <Select defaultValue={servicio?.area}>
              <SelectTrigger>
                <SelectValue placeholder="Seleccione un área" />
              </SelectTrigger>
              <SelectContent>
                {areas.map((a) => (
                  <SelectItem key={a} value={a}>
                    {a}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        <Button type="submit">
          {isEditing ? "Guardar Cambios" : "Crear Servicio"}
        </Button>
      </DialogContent>
    </Dialog>
  );
}
