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
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CalendarIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Calendar } from '@/components/ui/calendar';
import { format } from 'date-fns';
import { SolicitudCentroFormador } from './data';

const parseDate = (dateString: string): Date | undefined => {
    const parts = dateString.split('/');
    if (parts.length === 3) {
      const [day, month, year] = parts.map(Number);
      return new Date(year, month - 1, day);
    }
    return undefined;
};

interface FormularioSolicitudProps {
  solicitud?: SolicitudCentroFormador;
  onSuccess?: () => void;
}

export function FormularioSolicitud({ solicitud, onSuccess }: FormularioSolicitudProps) {
  const isEditMode = !!solicitud;
  
  const [fechaInicio, setFechaInicio] = React.useState<Date | undefined>(
    solicitud ? parseDate(solicitud.fechaInicio) : undefined
  );
  const [fechaTermino, setFechaTermino] = React.useState<Date | undefined>(
    solicitud ? parseDate(solicitud.fechaTermino) : undefined
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isEditMode) {
      console.log('Formulario de edición enviado', solicitud);
    } else {
      console.log('Formulario de nueva solicitud enviado');
    }
    if (onSuccess) {
      onSuccess();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="space-y-2">
          <Label htmlFor="carrera">Carrera</Label>
          <Input id="carrera" name="carrera" placeholder="Ej: Tens" defaultValue={solicitud?.carrera} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="ano-formacion">Año de Formación</Label>
          <Input id="ano-formacion" name="añoFormacion" placeholder="Ej: 4º Semestre" defaultValue={solicitud?.añoFormacion} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="tipo-practica">Tipo de Práctica</Label>
          <Select name="tipoPractica" defaultValue={solicitud?.tipoPractica}>
            <SelectTrigger id="tipo-practica">
              <SelectValue placeholder="Seleccione..." />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Curricular">Curricular</SelectItem>
              <SelectItem value="Profesional">Profesional</SelectItem>
              <SelectItem value="Internado">Internado</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="servicio-clinico">Servicio Clínico</Label>
          <Input id="servicio-clinico" name="servicioClinico" placeholder="Ej: Medicina" defaultValue={solicitud?.servicioClinico} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="numero-cupos">N° de Cupos</Label>
          <Input id="numero-cupos" name="numeroCupos" type="number" placeholder="Ej: 8" defaultValue={solicitud?.numeroCupos} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="tipo-jornada">Tipo de Jornada</Label>
          <Select name="tipoJornada" defaultValue={solicitud?.tipoJornada}>
            <SelectTrigger id="tipo-jornada">
              <SelectValue placeholder="Seleccione..." />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Diurna">Diurna</SelectItem>
              <SelectItem value="4 Turno">4 Turno</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="numero-alumnos">N° de Alumnos</Label>
          <Input id="numero-alumnos" name="numeroAlumnos" type="number" placeholder="Ej: 8" defaultValue={solicitud?.numeroAlumnos} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="asignatura">Asignatura (Opcional)</Label>
          <Input id="asignatura" name="asignatura" placeholder="Ej: Introducción a la Clínica" defaultValue={solicitud?.asignatura ?? ''} />
        </div>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
         <div className="space-y-2">
            <Label htmlFor="fecha-inicio">Fecha de Inicio</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"secondary"}
                  className={cn("w-full justify-start text-left font-normal", !fechaInicio && "text-muted-foreground")}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {fechaInicio ? format(fechaInicio, "dd/MM/yyyy") : <span>Seleccione una fecha</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar mode="single" selected={fechaInicio} onSelect={setFechaInicio} initialFocus />
              </PopoverContent>
            </Popover>
         </div>
         <div className="space-y-2">
            <Label htmlFor="fecha-termino">Fecha de Término</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"secondary"}
                  className={cn("w-full justify-start text-left font-normal", !fechaTermino && "text-muted-foreground")}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {fechaTermino ? format(fechaTermino, "dd/MM/yyyy") : <span>Seleccione una fecha</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar mode="single" selected={fechaTermino} onSelect={setFechaTermino} initialFocus />
              </PopoverContent>
            </Popover>
         </div>
      </div>

      <div className="flex justify-end pt-6">
        <Button type="submit">
          {isEditMode ? 'Guardar Cambios' : 'Enviar Solicitud'}
        </Button>
      </div>
    </form>
  );
}