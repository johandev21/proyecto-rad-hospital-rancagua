"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { DateRangePicker } from "@/components/ui/date-range-picker";
import { DateRange } from "react-day-picker";
import { Combobox, ComboboxOption } from "@/components/combobox";

const alumnos: ComboboxOption[] = [
    { value: "karla-labbe", label: "Karla Estrella Labbé" },
    { value: "alexis-burgos", label: "Alexis Andrés Burgos" },
    { value: "lucas-carroza", label: "Lucas Nicolás Carroza" },
];

const servicios: ComboboxOption[] = [
    { value: "medicina", label: "Medicina" },
    { value: "cirugia", label: "Cirugía" },
    { value: "pediatria", label: "Pediatría" },
    { value: "urgencias", label: "Urgencias" },
];

export function RotationForm() {
  const [dateRange, setDateRange] = React.useState<DateRange | undefined>();
  const [alumno, setAlumno] = React.useState<string>("");
  const [servicio, setServicio] = React.useState<string>("");

  return (
    <form className="grid gap-6">
      <div className="space-y-2">
        <Label htmlFor="alumno">Alumno</Label>
        <Combobox
          options={alumnos}
          value={alumno}
          onChange={setAlumno}
          placeholder="Seleccione un alumno..."
          searchPlaceholder="Buscar alumno..."
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="servicio">Servicio Clínico</Label>
        <Combobox
          options={servicios}
          value={servicio}
          onChange={setServicio}
          placeholder="Seleccione un servicio..."
          searchPlaceholder="Buscar servicio..."
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
            <Label htmlFor="tutor">Tutor Asignado</Label>
            <Input id="tutor" placeholder="Ej: Dr. Ricardo Soto" />
        </div>
         <div className="space-y-2">
            <Label htmlFor="docente">Docente Supervisor</Label>
            <Input id="docente" placeholder="Ej: Ana María López" />
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="periodo">Período de Rotación</Label>
        <DateRangePicker date={dateRange} onDateChange={setDateRange} />
      </div>
      <div className="flex justify-end">
        <Button type="submit">Guardar Cambios</Button>
      </div>
    </form>
  );
}