"use client";

import { Table } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { X } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
}

export function DataTableToolbar<TData>({ table }: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0;

  return (
    <div className="flex items-center justify-between gap-2">
      <div className="flex flex-1 items-center space-x-2">
        <Input
          placeholder="Filtrar por carrera, servicio..."
          value={(table.getState().globalFilter as string) ?? ""}
          onChange={(event) => table.setGlobalFilter(event.target.value)}
          className="h-8 w-[150px] lg:w-[250px]"
        />
        {/* Filtro por Institución */}
        <Select
          value={(table.getColumn("institucion")?.getFilterValue() as string) ?? "all"}
          onValueChange={value => table.getColumn("institucion")?.setFilterValue(value === "all" ? null : value)}
        >
          <SelectTrigger className="h-8 w-auto">
            <SelectValue placeholder="Institución" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todas las Instituciones</SelectItem>
            <SelectItem value="INACAP">INACAP</SelectItem>
            <SelectItem value="AIEP">AIEP</SelectItem>
            <SelectItem value="Santo Tomás">Santo Tomás</SelectItem>
          </SelectContent>
        </Select>

        {/* Filtro por Estado */}
        <Select
          value={(table.getColumn("status")?.getFilterValue() as string) ?? "all"}
          onValueChange={value => table.getColumn("status")?.setFilterValue(value === "all" ? null : value)}
        >
          <SelectTrigger className="h-8 w-auto">
            <SelectValue placeholder="Estado" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos los Estados</SelectItem>
            <SelectItem value="Pendiente">Pendiente</SelectItem>
            <SelectItem value="Aprobada">Aprobada</SelectItem>
            <SelectItem value="Rechazada">Rechazada</SelectItem>
          </SelectContent>
        </Select>
        
        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => table.resetColumnFilters()}
            className="h-8 px-2 lg:px-3"
          >
            Reset
            <X className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>
    </div>
  );
}