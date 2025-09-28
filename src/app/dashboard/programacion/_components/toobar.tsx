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
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        <Input
          placeholder="Filtrar por alumno o servicio..."
          value={(table.getColumn("alumno")?.getFilterValue() as string) ?? ""}
          onChange={(event) => table.getColumn("alumno")?.setFilterValue(event.target.value)}
          className="h-8 w-[150px] lg:w-[250px]"
        />
        <Select
          value={(table.getColumn("estado")?.getFilterValue() as string) ?? "all"}
          onValueChange={value => table.getColumn("estado")?.setFilterValue(value === "all" ? null : value)}
        >
          <SelectTrigger className="h-8 w-auto">
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
      <AddRotationModal />
    </div>
  );
}