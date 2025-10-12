import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FormularioRegistrar } from "./form-registrar";
import { FormularioRegistrarMultiple } from "./form-multiple-registrar";

export function ModalRegistrar() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Agregar Registro</Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-4xl bg-card">
        <DialogHeader>
          <DialogTitle className="text-xl md:text-2xl">
            Agregar Registros de Capacidad Formadora
          </DialogTitle>
          <DialogDescription>
            Puedes agregar un registro individualmente o subir un archivo Excel
            para agregar múltiples registros a la vez.
          </DialogDescription>
        </DialogHeader>
        <Tabs defaultValue="individual" className="w-full pt-2 min-w-0">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="individual">Registro Individual</TabsTrigger>
            <TabsTrigger value="multiple">Registro Múltiple</TabsTrigger>
          </TabsList>
          <TabsContent value="individual" className="py-4">
            <FormularioRegistrar />
          </TabsContent>
          <TabsContent value="multiple" className="py-4">
            <FormularioRegistrarMultiple />
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
