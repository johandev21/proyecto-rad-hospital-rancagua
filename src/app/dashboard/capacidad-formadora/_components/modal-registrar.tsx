import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { FormularioRegistrar } from "./form-registrar";

export function ModalRegistrar() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Agregar Cupo</Button>
      </DialogTrigger>
      
      <DialogContent className="sm:max-w-3xl">
        <DialogHeader>
          <DialogTitle className="text-2xl">Agregar Registro</DialogTitle>
          <DialogDescription>
            Complete los siguientes campos para añadir un nuevo cupo.
          </DialogDescription>
        </DialogHeader>
        <div className="py-4">
          <FormularioRegistrar />
        </div>
      </DialogContent>
    </Dialog>
  );
}