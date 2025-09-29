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
} from "@/components/ui/select";

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
}

export function DataTableToolbar<TData>({
  table,
}: DataTableToolbarProps<TData>) {
  const isFiltered =
    table.getState().columnFilters.length > 0 ||
    !!table.getState().globalFilter;

  const handleResetFilters = () => {
    table.resetColumnFilters();
    table.setGlobalFilter("");
  };

  return (
    <div className="flex flex-wrap items-center gap-2">
      <div className="flex flex-wrap flex-1 items-center gap-2">
        <Input
          placeholder="Filtrar por carrera, servicio..."
          value={(table.getState().globalFilter as string) ?? ""}
          onChange={(event) => table.setGlobalFilter(event.target.value)}
          className="h-9 flex-grow max-w-[320px] sm:min-w-[200px]"
        />

        <Select
          value={
            (table.getColumn("institucion")?.getFilterValue() as string) ??
            "all"
          }
          onValueChange={(value) =>
            table
              .getColumn("institucion")
              ?.setFilterValue(value === "all" ? null : value)
          }
        >
          <SelectTrigger className="h-8 w-full sm:w-[180px]">
            <SelectValue placeholder="Institución" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todas las Instituciones</SelectItem>
            <SelectItem value="INACAP">INACAP</SelectItem>
            <SelectItem value="AIEP">AIEP</SelectItem>
            <SelectItem value="Santo Tomás">Santo Tomás</SelectItem>
          </SelectContent>
        </Select>

        <Select
          value={
            (table.getColumn("status")?.getFilterValue() as string) ?? "all"
          }
          onValueChange={(value) =>
            table
              .getColumn("status")
              ?.setFilterValue(value === "all" ? null : value)
          }
        >
          <SelectTrigger className="h-8 w-full sm:w-[180px]">
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
            onClick={handleResetFilters}
            className="h-8 px-2 lg:px-3"
          >
            Resetear
            <X className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>
    </div>
  );
}
