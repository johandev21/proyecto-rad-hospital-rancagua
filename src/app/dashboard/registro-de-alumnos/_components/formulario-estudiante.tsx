"use client"

import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const instituciones = [
  "INACAP",
  "Universidad de O'Higgins",
  "Universidad San Sebastián",
];

export function FormularioEstudiante() {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Formulario de nuevo alumno enviado');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-y-4 gap-x-2 md:gap-x-4 md:gap-y-6">
        <div className="space-y-2">
          <Label htmlFor="nombre">Nombre</Label>
          <Input id="nombre" name="nombre" placeholder="Ej: Karla Estrella" />
        </div>

        <div className="space-y-2">
          <Label htmlFor="primer-apellido">Primer Apellido</Label>
          <Input id="primer-apellido" name="primerApellido" placeholder="Ej: Labbé" />
        </div>

        <div className="space-y-2">
          <Label htmlFor="segundo-apellido">Segundo Apellido</Label>
          <Input id="segundo-apellido" name="segundoApellido" placeholder="Ej: Zúñiga" />
        </div>

        <div className="space-y-2">
          <Label htmlFor="rut">RUT</Label>
          <Input id="rut" placeholder="Ej: 20.963.728-6" />
        </div>

        <div className="sm:col-span-2 space-y-2">
          <Label htmlFor="correo">Correo Electrónico</Label>
          <Input id="correo" type="email" placeholder="Ej: karla.labbe@pregrado.uoh.cl" />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="telefono">Teléfono</Label>
          <Input id="telefono" type="tel" placeholder="Ej: 966 599 330" />
        </div>

        <div className="space-y-2">
          <Label htmlFor="institucion">Institución</Label>
          <Select>
            <SelectTrigger id="institucion">
              <SelectValue placeholder="Seleccione una institución" />
            </SelectTrigger>
            <SelectContent>
              {instituciones.map(inst => (
                <SelectItem key={inst} value={inst}>{inst}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <div className="relative pt-4">
        <div className="absolute inset-0 flex items-center" aria-hidden="true">
          <div className="w-full border-t" />
        </div>
        <div className="relative flex justify-center">
          <span className="bg-card px-3 text-base font-semibold leading-6 text-foreground">
            Contacto de Emergencia
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="nombre-emergencia">Nombre del Contacto</Label>
          <Input id="nombre-emergencia" placeholder="Ej: Susy Zúñiga" />
        </div>

        <div className="space-y-2">
          <Label htmlFor="telefono-emergencia">Teléfono del Contacto</Label>
          <Input id="telefono-emergencia" type="tel" placeholder="Ej: 989 022 154" />
        </div>
      </div>

      <div className="flex justify-end pt-6">
        <Button type="submit">Guardar Alumno</Button>
      </div>
    </form>
  );
}