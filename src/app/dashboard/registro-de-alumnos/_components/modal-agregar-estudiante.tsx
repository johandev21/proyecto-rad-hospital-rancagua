import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Plus } from "lucide-react";
import { FormularioEstudiante } from "./formulario-estudiante";

export function ModalAgregarEstudiante() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="h-8">
            <Plus className="mr-2 h-4 w-4" />
            Añadir Alumno
        </Button>
      </DialogTrigger>
      
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-xl md:text-2xl">Añadir Nuevo Alumno</DialogTitle>
          <DialogDescription>
            Rellene los campos para registrar un nuevo alumno en el sistema.
          </DialogDescription>
        </DialogHeader>
        <div>
          <FormularioEstudiante />
        </div>
      </DialogContent>
    </Dialog>
  );
}