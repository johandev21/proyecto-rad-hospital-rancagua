"use client";

import { Table } from "@tanstack/react-table";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
}

export function DataTableToolbar<TData>({ table }: DataTableToolbarProps<TData>) {
  return (
    <div className="flex items-center">
      <div className="relative w-full sm:max-w-xs">
         <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Buscar por nombre de alumno..."
          value={(table.getColumn("alumno")?.getFilterValue() as string) ?? ""}
          onChange={(event) => table.getColumn("alumno")?.setFilterValue(event.target.value)}
          className="h-9 pl-9"
        />
      </div>
    </div>
  );
}