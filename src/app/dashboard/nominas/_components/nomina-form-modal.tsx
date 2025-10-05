"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Nomina } from "./data";
import { NominaForm } from "./nomina-form";

interface NominaFormModalProps {
  nomina?: Nomina;
  children: React.ReactNode;
}

export function NominaFormModal({ nomina, children }: NominaFormModalProps) {
  const isEditing = !!nomina;

  const handleSubmit = (data: any) => {
    console.log("Datos de la nómina enviados:", data);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>

      <DialogContent className="sm:max-w-3xl grid-rows-[auto_1fr_auto] p-0 max-h-[90vh]">
        <DialogHeader className="p-6 pb-4">
          <DialogTitle className="text-xl">
            {isEditing
              ? `Editando Nómina para ${nomina.servicioClinico}`
              : "Crear Nueva Nómina"}
          </DialogTitle>
          <DialogDescription>
            {isEditing
              ? `Modifique la lista de alumnos para la solicitud ${nomina.solicitudId}.`
              : "Complete la lista de alumnos y adjunte sus certificados."}
          </DialogDescription>
        </DialogHeader>

        <div className="overflow-y-auto px-6 py-2">
          <NominaForm nomina={nomina} onSubmit={handleSubmit} />
        </div>

        <DialogFooter className="p-6 pt-4 border-t">
          <Button type="submit" form="nomina-form">
            {isEditing ? "Guardar Cambios" : "Enviar Nómina"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
