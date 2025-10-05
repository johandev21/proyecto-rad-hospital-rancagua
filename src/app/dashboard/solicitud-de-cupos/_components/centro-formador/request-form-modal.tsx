"use client";

import * as React from "react";
import { DateRange } from "react-day-picker";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DateRangePicker } from "@/components/ui/date-range-picker";

export function RequestFormModal({ children }: { children: React.ReactNode }) {
  const [dateRange, setDateRange] = React.useState<DateRange | undefined>();

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>Nueva Solicitud de Cupo</DialogTitle>
          <DialogDescription>Complete los detalles para solicitar nuevos cupos de rotación.</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2"><Label>Carrera</Label><Input placeholder="Ej: Enfermería" /></div>
            <div className="space-y-2"><Label>Año/Semestre</Label><Input placeholder="Ej: 4º Semestre" /></div>
          </div>
           <div className="space-y-2"><Label>Servicio Clínico Deseado</Label><Input placeholder="Ej: Pediatría" /></div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
             <div className="space-y-2"><Label>Número de Cupos</Label><Input type="number" placeholder="Ej: 8" /></div>
             <div className="space-y-2"><Label>Tipo de Práctica</Label>
                <Select><SelectTrigger><SelectValue placeholder="Seleccione..." /></SelectTrigger>
                    <SelectContent><SelectItem value="curricular">Curricular</SelectItem><SelectItem value="profesional">Profesional</SelectItem></SelectContent>
                </Select>
             </div>
          </div>
          <div className="space-y-2">
            <Label>Período Deseado</Label>
            <DateRangePicker date={dateRange} onDateChange={setDateRange} />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit">Enviar Solicitud</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}