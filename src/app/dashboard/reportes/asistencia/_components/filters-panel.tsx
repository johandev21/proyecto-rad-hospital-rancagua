"use client";

import * as React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { DateRangePicker } from "@/components/ui/date-range-picker";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Search, RotateCcw } from "lucide-react";
import { Combobox } from "@/components/combobox";

const alumnos = [{ value: "karla-labbe", label: "Karla Estrella Labbé" }, { value: "alexis-burgos", label: "Alexis Andrés Burgos" }];
const servicios = ["Medicina", "Cirugía", "Pediatría"];

interface FiltersPanelProps {
  onGenerate: (filters: any) => void;
  isLoading: boolean;
}

export function FiltersPanel({ onGenerate, isLoading }: FiltersPanelProps) {
  const [dateRange, setDateRange] = React.useState<any>();
  const [alumno, setAlumno] = React.useState<string>("");
  const [servicio, setServicio] = React.useState<string>("");

  const handleGenerate = () => {
    onGenerate({ dateRange, alumno, servicio });
  };
  
  const handleClear = () => {
    setDateRange(undefined);
    setAlumno("");
    setServicio("");
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Filtros del Reporte</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="space-y-2">
            <Label>Rango de Fechas</Label>
            <DateRangePicker date={dateRange} onDateChange={setDateRange} />
          </div>
          <div className="space-y-2">
            <Label>Alumno (Opcional)</Label>
            <Combobox options={alumnos} value={alumno} onChange={setAlumno} placeholder="Todos los alumnos" />
          </div>
          <div className="space-y-2">
            <Label>Servicio Clínico (Opcional)</Label>
            <Select value={servicio} onValueChange={setServicio}>
              <SelectTrigger><SelectValue placeholder="Todos los servicios" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos los servicios</SelectItem>
                {servicios.map(s => <SelectItem key={s} value={s.toLowerCase()}>{s}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-end space-x-2">
            <Button onClick={handleClear} variant="outline"><RotateCcw className="mr-2 h-4 w-4" />Limpiar</Button>
            <Button onClick={handleGenerate} disabled={isLoading}>
              <Search className="mr-2 h-4 w-4" />
              {isLoading ? "Generando..." : "Generar"}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}