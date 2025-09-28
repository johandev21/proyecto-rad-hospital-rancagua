import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { PlusCircle } from "lucide-react";
import { RotationForm } from "./rotation-form";

export function AddRotationModal() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="sm">
            <PlusCircle className="mr-2 h-4 w-4" />
            Programar Rotación
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-xl">
        <DialogHeader>
          <DialogTitle className="text-xl">Programar Nueva Rotación</DialogTitle>
          <DialogDescription>
            Complete los detalles para asignar un estudiante a un servicio clínico.
          </DialogDescription>
        </DialogHeader>
        <div className="py-4">
          <RotationForm />
        </div>
      </DialogContent>
    </Dialog>
  );
}