"use client";

import { Table } from "@tanstack/react-table";
import { Input } from "@/components/ui/input";
import { AddRotationModal } from "./add-rotation-modal";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
}

export function DataTableToolbar<TData>({ table }: DataTableToolbarProps<TData>) {
  return (
    <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
      
      <div className="flex w-full md:w-xl flex-col items-center gap-2 sm:flex-row sm:gap-2">
        <Input
          placeholder="Filtrar por alumno o servicio..."
          value={(table.getColumn("alumno")?.getFilterValue() as string) ?? ""}
          onChange={(event) => table.getColumn("alumno")?.setFilterValue(event.target.value)}
          className="h-9 w-full flex-1"
        />
        <Select
          value={(table.getColumn("estado")?.getFilterValue() as string) ?? "all"}
          onValueChange={value => table.getColumn("estado")?.setFilterValue(value === "all" ? null : value)}
        >
          <SelectTrigger className="h-9 w-full sm:w-[180px]">
            <SelectValue placeholder="Filtrar por estado" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos los estados</SelectItem>
            <SelectItem value="Programada">Programada</SelectItem>
            <SelectItem value="En Curso">En Curso</SelectItem>
            <SelectItem value="Finalizada">Finalizada</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <div className="w-full md:w-auto">
        <AddRotationModal />
      </div>

    </div>
  );
}