"use client";

import * as React from "react";
import { Table } from "@tanstack/react-table";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SlidersHorizontal, UserPlus, X } from "lucide-react";
import { ModalAgregarEstudiante } from "./modal-agregar-estudiante";
import { ModalAsignarRotacion } from "./modal-asignar-rotacion";
import { Alumno } from "./data";

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
}

export function DataTableToolbar<TData>({
  table,
}: DataTableToolbarProps<TData>) {
  const isFiltered = (table.getState().globalFilter?.length ?? 0) > 0;
  const [isAssignModalOpen, setIsAssignModalOpen] = React.useState(false);

  const selectedAlumnos = table
    .getFilteredSelectedRowModel()
    .rows.map(row => row.original as Alumno);

  return (
    <>
      <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
        <div className="flex w-full flex-1 items-center gap-2">
          <Input
            placeholder="Filtrar por nombre, rut, correo..."
            value={(table.getState().globalFilter as string) ?? ""}
            onChange={(event) => table.setGlobalFilter(event.target.value)}
            className="h-9 w-full sm:w-[250px] lg:w-[300px]"
          />
          {isFiltered && (
            <Button
              variant="ghost"
              onClick={() => table.setGlobalFilter("")}
              className="h-9 px-2 lg:px-3"
            >
              Resetear
              <X className="ml-2 h-4 w-4" />
            </Button>
          )}
        </div>

        <div className="flex w-full items-center justify-end space-x-2 md:w-auto">
          {selectedAlumnos.length > 0 && (
            <Button
              variant="outline"
              size="sm"
              className="h-9"
              onClick={() => setIsAssignModalOpen(true)}
            >
              <UserPlus className="mr-2 h-4 w-4" />
              Asignar a Rotación ({selectedAlumnos.length})
            </Button>
          )}

          <ModalAgregarEstudiante />

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="h-9">
                <SlidersHorizontal className="mr-2 h-4 w-4" />
                Vista
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[150px]">
              <DropdownMenuLabel>Alternar columnas</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {table
                .getAllColumns()
                .filter(
                  (column) =>
                    typeof column.accessorFn !== "undefined" &&
                    column.getCanHide()
                )
                .map((column) => {
                  return (
                    <DropdownMenuCheckboxItem
                      key={column.id}
                      className="capitalize"
                      checked={column.getIsVisible()}
                      onCheckedChange={(value) =>
                        column.toggleVisibility(!!value)
                      }
                    >
                      {column.id.replace(/([A-Z])/g, " $1")}
                    </DropdownMenuCheckboxItem>
                  );
                })}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      
      <ModalAsignarRotacion
        isOpen={isAssignModalOpen}
        onOpenChange={setIsAssignModalOpen}
        selectedAlumnos={selectedAlumnos}
      />
    </>
  );
}