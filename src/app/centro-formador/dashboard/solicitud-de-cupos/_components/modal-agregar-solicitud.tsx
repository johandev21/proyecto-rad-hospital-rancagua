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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FormularioSolicitud } from "./formulario-solicitud";
import { FormularioMultipleSolicitudes } from "./formulario-multiple-solicitudes";

export function ModalAgregarSolicitud() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="w-full md:w-auto">
          <PlusCircle className="mr-2 h-4 w-4" />
          Crear Solicitud
        </Button>
      </DialogTrigger>
      
      <DialogContent className="sm:max-w-4xl">
        <DialogHeader>
          <DialogTitle className="text-xl md:text-2xl">Crear Nueva Solicitud de Cupos</DialogTitle>
          <DialogDescription>
            Puedes crear una solicitud individualmente o subir un archivo para agregar múltiples a la vez.
          </DialogDescription>
        </DialogHeader>
        
        <Tabs defaultValue="individual" className="w-full pt-2 min-w-0">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="individual">Registro Individual</TabsTrigger>
            <TabsTrigger value="multiple">Registro Múltiple (Excel)</TabsTrigger>
          </TabsList>
          
          <TabsContent value="individual" className="py-4">
             <FormularioSolicitud />
          </TabsContent>
          <TabsContent value="multiple" className="py-4">
            <FormularioMultipleSolicitudes />
          </TabsContent>
        </Tabs>

      </DialogContent>
    </Dialog>
  );
}