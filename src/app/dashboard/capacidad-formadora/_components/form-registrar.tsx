"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Combobox, ComboboxOption } from "@/components/combobox";

const carreras: ComboboxOption[] = [
  { value: "medicina", label: "Medicina" },
  { value: "enfermeria", label: "Enfermería" },
  { value: "kinesiologia", label: "Kinesiología" },
  { value: "tecnologia_medica", label: "Tecnología Médica" },
];

const centrosFormadores: ComboboxOption[] = [
  { value: "uohiggins", label: "Universidad de O'Higgins" },
  { value: "uss", label: "Universidad San Sebastián" },
  { value: "uautonoma", label: "Universidad Autónoma" },
];

export function FormularioRegistrar() {
  const [carrera, setCarrera] = useState<string>("");
  const [centroFormador, setCentroFormador] = useState<string>("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Formulario enviado");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="servicio">Servicio</Label>
          <Input id="servicio" placeholder="Ej: Medicina" />
        </div>

        <div className="space-y-2">
          <Label htmlFor="carrera">Carrera</Label>
          <Combobox
            options={carreras}
            value={carrera}
            onChange={setCarrera}
            placeholder="Seleccione una carrera..."
            searchPlaceholder="Buscar carrera..."
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="nivel-formacion">Nivel de Formación</Label>
          <Input id="nivel-formacion" placeholder="Ej: Pregrado" />
        </div>

        <div className="space-y-2">
          <Label htmlFor="tipo-practica">Tipo de Práctica</Label>
          <Select>
            <SelectTrigger id="tipo-practica">
              <SelectValue placeholder="Seleccione..." />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="curricular">Curricular</SelectItem>
              <SelectItem value="internado">Internado</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="centro-formador">Centro Formador</Label>
        <Combobox
          options={centrosFormadores}
          value={centroFormador}
          onChange={setCentroFormador}
          placeholder="Seleccione un centro..."
          searchPlaceholder="Buscar centro formador..."
        />
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="ano-formacion">Año de Formación</Label>
          <Input id="ano-formacion" placeholder="Ej: 2º año" />
        </div>

        <div className="space-y-2">
          <Label htmlFor="tipo-jornada">Tipo de Jornada</Label>
          <Select>
            <SelectTrigger id="tipo-jornada">
              <SelectValue placeholder="Seleccione..." />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="am-pm">AM - PM</SelectItem>
              <SelectItem value="diurno">Diurno</SelectItem>
              <SelectItem value="cuarto-turno">Cuarto Turno</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="cupos">N° de Cupos por Centro Formador</Label>
        <Input id="cupos" type="number" placeholder="Ej: 10" />
      </div>

      <div className="flex justify-end pt-4">
        <Button type="submit">Guardar</Button>
      </div>
    </form>
  );
}
