"use client";

import { Table } from "@tanstack/react-table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { ServiceFormModal } from "./service-form-modal";

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
}

export function DataTableToolbar<TData>({
  table,
}: DataTableToolbarProps<TData>) {
  return (
    <div className="flex items-center justify-between">
      <Input
        placeholder="Buscar por nombre de servicio..."
        className="h-8 w-[150px] lg:w-[250px]"
      />
      <ServiceFormModal>
        <Button size="sm">
          <PlusCircle className="mr-2 h-4 w-4" />
          Crear Servicio
        </Button>
      </ServiceFormModal>
    </div>
  );
}
