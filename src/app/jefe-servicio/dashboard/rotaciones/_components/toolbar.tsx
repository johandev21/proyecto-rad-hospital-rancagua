"use client";

import * as React from "react";
import { Table } from "@tanstack/react-table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CalendarIcon, X } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { DateRange } from "react-day-picker";
import {
  format,
} from "date-fns";
import { es } from "date-fns/locale";
import { cn } from "@/lib/utils";
import { RotacionServicio, EstadoRotacion } from "./data";

const getUniqueValues = (
  data: RotacionServicio[],
  key: keyof RotacionServicio
): string[] => {
  const values = data.map((item) => item[key]);
  return [...new Set(values.filter(Boolean))] as string[];
};

interface RotacionesToolbarProps<TData extends RotacionServicio> {
  table: Table<TData>;
}

export function RotacionesToolbar<TData extends RotacionServicio>({
  table,
}: RotacionesToolbarProps<TData>) {
  const [dateRange, setDateRange] = React.useState<DateRange | undefined>(
    undefined
  );

  const uniqueCentros = React.useMemo(
    () => getUniqueValues(table.options.data, "centroFormador"),
    [table.options.data]
  );
  const uniqueCarreras = React.useMemo(
    () => getUniqueValues(table.options.data, "carrera"),
    [table.options.data]
  );
  const uniqueEstados: EstadoRotacion[] = [
    "Programada",
    "En Curso",
    "Finalizada",
  ];

  React.useEffect(() => {
    table.getColumn("periodo")?.setFilterValue(dateRange);
  }, [dateRange, table]);

  const isFiltered = table.getState().columnFilters.length > 0;

  const handleResetFilters = () => {
    table.resetColumnFilters();
    setDateRange(undefined);
  };

  return (
    <div className="flex flex-col md:flex-row items-center gap-4 justify-between">
      <div className="flex flex-wrap items-center gap-2 flex-1 w-full">
        <Input
          placeholder="Buscar..."
          value={(table.getState().globalFilter as string) ?? ""}
          onChange={(event) => table.setGlobalFilter(event.target.value)}
          className="h-9 w-full sm:w-auto sm:min-w-[150px] lg:max-w-xs"
        />

        <Popover>
          <PopoverTrigger asChild>
            <Button
              id="date"
              variant={"outline"}
              className={cn(
                "h-9 w-full justify-start text-left font-normal sm:w-[240px]",
                !dateRange && "text-muted-foreground"
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {dateRange?.from ? (
                dateRange.to ? (
                  <>
                    {format(dateRange.from, "LLL dd, y", { locale: es })} -{" "}
                    {format(dateRange.to, "LLL dd, y", { locale: es })}
                  </>
                ) : (
                  format(dateRange.from, "LLL dd, y", { locale: es })
                )
              ) : (
                <span>Seleccionar Fechas</span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              initialFocus
              mode="range"
              defaultMonth={dateRange?.from}
              selected={dateRange}
              onSelect={setDateRange}
              numberOfMonths={2}
              locale={es}
            />
          </PopoverContent>
        </Popover>

        {/* Centro Formador Filter */}
        <Select
          value={
            (table.getColumn("centroFormador")?.getFilterValue() as string) ??
            "all"
          }
          onValueChange={(value) =>
            table
              .getColumn("centroFormador")
              ?.setFilterValue(value === "all" ? undefined : value)
          }
        >
          <SelectTrigger className="h-9 w-full sm:w-[180px]">
            <SelectValue placeholder="Centro Formador" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos los Centros</SelectItem>
            {uniqueCentros.map((centro) => (
              <SelectItem key={centro} value={centro}>
                {centro}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Carrera Filter */}
        <Select
          value={
            (table.getColumn("carrera")?.getFilterValue() as string) ?? "all"
          }
          onValueChange={(value) =>
            table
              .getColumn("carrera")
              ?.setFilterValue(value === "all" ? undefined : value)
          }
        >
          <SelectTrigger className="h-9 w-full sm:w-[180px]">
            <SelectValue placeholder="Carrera" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todas las Carreras</SelectItem>
            {uniqueCarreras.map((carrera) => (
              <SelectItem key={carrera} value={carrera}>
                {carrera}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Estado Filter */}
        <Select
          value={
            (table.getColumn("estado")?.getFilterValue() as string) ?? "all"
          }
          onValueChange={(value) =>
            table
              .getColumn("estado")
              ?.setFilterValue(value === "all" ? undefined : value)
          }
        >
          <SelectTrigger className="h-9 w-full sm:w-[150px]">
            <SelectValue placeholder="Estado" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos los Estados</SelectItem>
            {uniqueEstados.map((estado) => (
              <SelectItem key={estado} value={estado}>
                {estado}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Boton Resetear */}
        {isFiltered && (
          <Button
            variant="ghost"
            onClick={handleResetFilters}
            className="h-9 px-2 lg:px-3"
          >
            Resetear
            <X className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>
    </div>
  );
}
