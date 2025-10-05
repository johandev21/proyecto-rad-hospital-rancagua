"use client";

import { Table } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { NominaFormModal } from "./nomina-form-modal";

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
}

export function DataTableToolbar<TData>({ table }: DataTableToolbarProps<TData>) {
  return (
    <div className="flex items-center justify-end">
      <NominaFormModal>
        <Button size="sm">
          <PlusCircle className="mr-2 h-4 w-4" />
          Crear Nómina
        </Button>
      </NominaFormModal>
    </div>
  );
}