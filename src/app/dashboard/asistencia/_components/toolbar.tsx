"use client";

import * as React from "react";
import { Table } from "@tanstack/react-table";
import { Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { DateRangePicker } from "@/components/ui/date-range-picker";
import { DateRange } from "react-day-picker";
import { DatePicker } from "@/components/ui/date-picker";

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
  viewMode: 'day' | 'range';
  setViewMode: (mode: 'day' | 'range') => void;
  date: Date;
  setDate: (date: Date) => void;
  dateRange: DateRange | undefined;
  setDateRange: (range: DateRange | undefined) => void;
  hasChanges: boolean;
  onSaveChanges: () => void;
}

const servicios = ["Medicina", "Cirugía", "Urgencias", "Pediatría"];

export function DataTableToolbar<TData>({
  table, viewMode, setViewMode, date, setDate, dateRange, setDateRange, hasChanges, onSaveChanges
}: DataTableToolbarProps<TData>) {
  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
      <div className="flex flex-1 flex-wrap gap-y-2 items-center space-x-2">
        <ToggleGroup className="border" type="single" value={viewMode} onValueChange={(value: 'day' | 'range') => value && setViewMode(value)} size="sm">
            <ToggleGroupItem className="px-4" value="day">Día</ToggleGroupItem>
            <ToggleGroupItem className="px-4" value="range">Rango</ToggleGroupItem>
        </ToggleGroup>
        
        {viewMode === 'day' ? (
            <DatePicker date={date} setDate={setDate} />
        ) : (
            <DateRangePicker date={dateRange} onDateChange={setDateRange} className="w-full md:w-auto" />
        )}

        <Select
          value={(table.getColumn("servicioClinico")?.getFilterValue() as string) ?? "all"}
          onValueChange={(value) => table.getColumn("servicioClinico")?.setFilterValue(value === "all" ? null : value)}
        >
          <SelectTrigger className="h-9 md:w-auto">
            <SelectValue placeholder="Filtrar por servicio" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos los servicios</SelectItem>
            {servicios.map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}
          </SelectContent>
        </Select>
      </div>
      <Button onClick={onSaveChanges} disabled={!hasChanges}>
        <Save className="mr-2 h-4 w-4" />
        Guardar Cambios
      </Button>
    </div>
  );
}