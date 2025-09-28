"use client";

import * as React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { DateRangePicker } from "@/components/ui/date-range-picker";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Search, RotateCcw } from "lucide-react";
import { DateRange } from "react-day-picker";

const instituciones = ["INACAP", "UOH", "AIEP"];
const carreras = ["Medicina", "Tens", "Enfermería"];
const estados = ["Programada", "En Curso", "Finalizada"];

interface FiltersState {
  dateRange: DateRange | undefined;
  institucion: string;
  carrera: string;
  estado: string;
}

interface FiltersPanelProps {
  onGenerate: (filters: FiltersState) => void;
  isLoading: boolean;
}

export function FiltersPanel({ onGenerate, isLoading }: FiltersPanelProps) {
  const [filters, setFilters] = React.useState<FiltersState>({
    dateRange: undefined,
    institucion: "all",
    carrera: "all",
    estado: "all",
  });

  const handleGenerate = () => onGenerate(filters);
  const handleClear = () =>
    setFilters({
      dateRange: undefined,
      institucion: "all",
      carrera: "all",
      estado: "all",
    });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Filtros del Reporte</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          <div className="space-y-2 lg:col-span-2">
            <Label>Rango de Fechas</Label>
            <DateRangePicker
              date={filters.dateRange}
              onDateChange={(date) =>
                setFilters((f) => ({ ...f, dateRange: date }))
              }
            />
          </div>
          <div className="space-y-2">
            <Label>Institución</Label>
            <Select
              value={filters.institucion}
              onValueChange={(v) =>
                setFilters((f) => ({ ...f, institucion: v }))
              }
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas</SelectItem>
                {instituciones.map((s) => (
                  <SelectItem key={s} value={s}>
                    {s}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>Carrera</Label>
            <Select
              value={filters.carrera}
              onValueChange={(v) => setFilters((f) => ({ ...f, carrera: v }))}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas</SelectItem>
                {carreras.map((s) => (
                  <SelectItem key={s} value={s}>
                    {s}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-end space-x-2">
            <Button onClick={handleClear} variant="outline">
              <RotateCcw className="mr-2 h-4 w-4" />
              Limpiar
            </Button>
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
