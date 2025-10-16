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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FormularioEstudiante } from "./formulario-estudiante";
import { FormularioMultipleEstudiantes } from "./formulario-multiple-estudiantes";

export function ModalAgregarEstudiante() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="sm" className="h-9">
            <Plus className="mr-2 h-4 w-4" />
            Añadir Alumnos
        </Button>
      </DialogTrigger>
      
      <DialogContent className="sm:max-w-4xl bg-card">
        <DialogHeader>
          <DialogTitle className="text-xl md:text-2xl">Añadir Alumnos a la Nómina</DialogTitle>
          <DialogDescription>
            Puedes registrar un alumno individualmente o subir un archivo Excel para añadir múltiples alumnos a la vez.
          </DialogDescription>
        </DialogHeader>
        <Tabs defaultValue="individual" className="w-full pt-2 min-w-0">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="individual">Registro Individual</TabsTrigger>
            <TabsTrigger value="multiple">Registro Múltiple</TabsTrigger>
          </TabsList>
          <TabsContent value="individual" className="py-4">
             <FormularioEstudiante />
          </TabsContent>
          <TabsContent value="multiple" className="py-4">
            <FormularioMultipleEstudiantes />
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}