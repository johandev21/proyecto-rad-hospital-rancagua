"use client";

import { Table } from "@tanstack/react-table";
import { Input } from "@/components/ui/input";

interface NominasToolbarProps<TData> {
  table: Table<TData>;
}

export function NominasToolbar<TData>({
  table,
}: NominasToolbarProps<TData>) {
  return (
    <div className="flex items-center">
      <Input
        placeholder="Filtrar por servicio, carrera..."
        value={(table.getColumn("servicioClinico")?.getFilterValue() as string) ?? ""}
        onChange={(event) =>
          table.getColumn("servicioClinico")?.setFilterValue(event.target.value)
        }
        className="h-9 max-w-sm"
      />
    </div>
  );
}