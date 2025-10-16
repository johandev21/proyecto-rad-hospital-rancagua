"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Alumno } from "./data";
import { cuposAprobadosData, CupoAprobado } from "./cupos-aprobados-data";
import { Badge } from "@/components/ui/badge";
import { Users, Calendar, Stethoscope, Briefcase, Clock, ArrowLeft, Send } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

interface ModalAsignarRotacionProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  selectedAlumnos: Alumno[];
}

// Definimos los posibles pasos del modal
type Step = "SELECT_CUPO" | "CONFIRM_NOMINA";

export function ModalAsignarRotacion({ isOpen, onOpenChange, selectedAlumnos }: ModalAsignarRotacionProps) {
  // Estado para controlar el paso actual del modal
  const [step, setStep] = useState<Step>("SELECT_CUPO");
  // Estado para almacenar el cupo que el usuario selecciona
  const [selectedCupo, setSelectedCupo] = useState<CupoAprobado | null>(null);

  // Se ejecuta cuando el usuario elige un cupo en el primer paso
  const handleCupoSelect = (cupo: CupoAprobado) => {
    setSelectedCupo(cupo);
    setStep("CONFIRM_NOMINA"); // Avanzamos al siguiente paso
  };

  // Se ejecuta cuando el usuario confirma el envío final de la nómina
  const handleConfirmAndSend = () => {
    console.log("--- NÓMINA FINAL ENVIADA ---");
    console.log("Cupo de Rotación:", selectedCupo);
    console.log("Alumnos Asignados:", selectedAlumnos);
    
    alert(`Nómina enviada para el servicio de ${selectedCupo?.servicioClinico}. Revisa la consola para ver los datos completos.`);
    
    // Cerramos el modal y reseteamos su estado para la próxima vez que se abra
    handleClose(); 
  };
  
  // Función para cerrar y resetear el estado del modal
  const handleClose = () => {
    onOpenChange(false);
    // Usamos un timeout para que el usuario no vea el reseteo mientras se cierra el modal
    setTimeout(() => {
        setStep("SELECT_CUPO");
        setSelectedCupo(null);
    }, 200);
  };

  // Renderiza el contenido del primer paso: Selección de Cupo
  const renderSelectCupoStep = () => (
    <>
      <DialogHeader>
        <DialogTitle className="text-xl md:text-2xl">Asignar Alumnos a Rotación</DialogTitle>
        <DialogDescription>
          Has seleccionado {selectedAlumnos.length} alumno(s). Ahora, elige un cupo aprobado para asignarlos a su rotación.
        </DialogDescription>
      </DialogHeader>
      <div className="py-4">
        <p className="mb-4 text-sm font-semibold">Cupos Aprobados Disponibles</p>
        <ScrollArea className="h-[400px] rounded-md border">
          <div className="p-4 space-y-4">
            {cuposAprobadosData.map((cupo) => {
              const isAssignable = selectedAlumnos.length <= cupo.numeroCupos;
              return (
                <div key={cupo.id} className="border rounded-lg p-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-3">
                      <h3 className="font-bold text-lg text-primary">{cupo.servicioClinico}</h3>
                      <Badge variant="secondary">{cupo.tipoPractica}</Badge>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-6 gap-y-2 text-sm text-muted-foreground">
                      <div className="flex items-center gap-2"><Briefcase className="h-4 w-4" /> {cupo.carrera}</div>
                      <div className="flex items-center gap-2"><Clock className="h-4 w-4" /> {cupo.tipoJornada}</div>
                      <div className="flex items-center gap-2 col-span-2 sm:col-span-1"><Users className="h-4 w-4" /> {cupo.numeroCupos} Cupos</div>
                      <div className="flex items-center gap-2 col-span-2"><Calendar className="h-4 w-4" /> {cupo.fechaInicio} - {cupo.fechaTermino}</div>
                    </div>
                  </div>
                  <div className="flex flex-col items-stretch md:items-end gap-2 w-full md:w-auto">
                    <Button onClick={() => handleCupoSelect(cupo)} disabled={!isAssignable} className="w-full md:w-auto">
                      Seleccionar
                    </Button>
                    {!isAssignable && (
                      <p className="text-xs text-destructive text-center md:text-right">
                        Se requieren {cupo.numeroCupos} cupos. Has seleccionado {selectedAlumnos.length}.
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </ScrollArea>
      </div>
    </>
  );

  // Renderiza el contenido del segundo paso: Confirmación
  const renderConfirmNominaStep = () => (
    <>
      <DialogHeader>
        <DialogTitle className="text-xl md:text-2xl">Confirmar y Enviar Nómina</DialogTitle>
        <DialogDescription>
          Revisa los detalles de la rotación y la lista de alumnos antes de enviar la nómina al RAD.
        </DialogDescription>
      </DialogHeader>
      <div className="py-4 space-y-6">
        {/* Resumen del Cupo Seleccionado */}
        <div>
          <h3 className="mb-4 text-lg font-semibold">Detalles de la Rotación</h3>
          <div className="border rounded-lg p-4 space-y-3">
             <div className="flex items-center gap-3">
                <h4 className="font-bold text-xl text-primary">{selectedCupo?.servicioClinico}</h4>
                <Badge>{selectedCupo?.tipoPractica}</Badge>
             </div>
             <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="flex items-center gap-2 text-muted-foreground"><Briefcase className="h-4 w-4" /> <strong>Carrera:</strong> {selectedCupo?.carrera}</div>
                <div className="flex items-center gap-2 text-muted-foreground"><Clock className="h-4 w-4" /> <strong>Jornada:</strong> {selectedCupo?.tipoJornada}</div>
                <div className="flex items-center gap-2 text-muted-foreground col-span-2"><Calendar className="h-4 w-4" /> <strong>Período:</strong> {selectedCupo?.fechaInicio} al {selectedCupo?.fechaTermino}</div>
             </div>
          </div>
        </div>
        <Separator />
        {/* Lista de Alumnos a Asignar */}
        <div>
          <h3 className="mb-4 text-lg font-semibold">Alumnos a Asignar ({selectedAlumnos.length} de {selectedCupo?.numeroCupos} cupos)</h3>
          <ScrollArea className="h-[200px] rounded-md border">
            <div className="p-1">
              {selectedAlumnos.map((alumno) => (
                <div key={alumno.id} className="flex justify-between items-center p-3 border-b">
                  <div>
                    <p className="font-medium">{`${alumno.nombre} ${alumno.primerApellido}`}</p>
                    <p className="text-sm text-muted-foreground">{alumno.rut}</p>
                  </div>
                  <p className="text-sm text-muted-foreground hidden sm:block">{alumno.correo}</p>
                </div>
              ))}
            </div>
          </ScrollArea>
        </div>
      </div>
      <DialogFooter className="pt-4 flex-col-reverse sm:flex-row sm:justify-between w-full">
         <Button variant="outline" onClick={() => setStep("SELECT_CUPO")}>
            <ArrowLeft className="mr-2 h-4 w-4" /> Volver
         </Button>
         <Button onClick={handleConfirmAndSend}>
            Confirmar y Enviar Nómina <Send className="ml-2 h-4 w-4" />
         </Button>
      </DialogFooter>
    </>
  );

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-4xl">
        {step === "SELECT_CUPO" ? renderSelectCupoStep() : renderConfirmNominaStep()}
      </DialogContent>
    </Dialog>
  );
}