"use client";

import { Table } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { PlusCircle } from "lucide-react";
import { RequestFormModal } from "./request-form-modal";

interface DataTableToolbarProps<TData> { table: Table<TData>; }

export function DataTableToolbar<TData>({ table }: DataTableToolbarProps<TData>) {
  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
      <div className="flex w-full sm:w-auto items-center space-x-2">
        <Select
            value={(table.getColumn("status")?.getFilterValue() as string) ?? "all"}
            onValueChange={value => table.getColumn("status")?.setFilterValue(value === "all" ? null : value)}
        >
          <SelectTrigger className="h-9 w-full sm:w-[180px]"><SelectValue placeholder="Filtrar por estado" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos los Estados</SelectItem>
            <SelectItem value="Pendiente">Pendiente</SelectItem>
            <SelectItem value="Aprobada">Aprobada</SelectItem>
            <SelectItem value="Rechazada">Rechazada</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="w-full sm:w-auto">
        <RequestFormModal>
            <Button className="w-full"><PlusCircle className="mr-2 h-4 w-4" />Nueva Solicitud</Button>
        </RequestFormModal>
      </div>
    </div>
  );
}