"use client";

import * as React from "react";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  getExpandedRowModel,
  SortingState,
  ColumnFiltersState,
  getFilteredRowModel,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { DataTablePagination } from "@/components/ui/pagination";
import { NominasToolbar } from "./toolbar";
import { NominaEnviada } from "./data";
import { Separator } from "@/components/ui/separator";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function NominasEnviadasDataTable<TData extends NominaEnviada, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);

  const table = useReactTable({
    data,
    columns,
    state: { sorting, columnFilters },
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    // La fila se puede expandir si tiene alumnos asignados
    getRowCanExpand: (row) => row.original.alumnosAsignados && row.original.alumnosAsignados.length > 0,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getExpandedRowModel: getExpandedRowModel(),
  });

  return (
    <div className="space-y-4">
      <NominasToolbar table={table} />
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <React.Fragment key={row.id}>
                  {/* Fila principal */}
                  <TableRow data-state={row.getIsSelected() && "selected"}>
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </TableCell>
                    ))}
                  </TableRow>
                  
                  {/* Fila expandida - Siguiendo el patrón correcto */}
                  {row.getIsExpanded() && (
                    <TableRow className="bg-muted/50 hover:bg-muted/50">
                      <TableCell colSpan={columns.length} className="p-4">
                        <div className="space-y-2">
                           <h4 className="text-md font-semibold">Alumnos Asignados a la Rotación</h4>
                           <Separator />
                           {/* Contenedor de la lista de alumnos */}
                           <div className="rounded-md bg-background/50">
                              {row.original.alumnosAsignados.map((alumno, index) => (
                                <div 
                                  key={alumno.id} 
                                  className="grid grid-cols-1 sm:grid-cols-3 gap-x-4 gap-y-1 p-3"
                                >
                                  <div className="flex flex-col">
                                    <span className="text-xs text-muted-foreground sm:hidden">Nombre</span>
                                    <span className="font-medium">{`${alumno.nombre} ${alumno.primerApellido}`}</span>
                                  </div>
                                  <div className="flex flex-col">
                                     <span className="text-xs text-muted-foreground sm:hidden">RUT</span>
                                     <span>{alumno.rut}</span>
                                  </div>
                                  <div className="flex flex-col">
                                     <span className="text-xs text-muted-foreground sm:hidden">Correo</span>
                                     <span className="text-muted-foreground truncate">{alumno.correo}</span>
                                  </div>
                                </div>
                              ))}
                           </div>
                        </div>
                      </TableCell>
                    </TableRow>
                  )}
                </React.Fragment>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No se encontraron nóminas enviadas.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <DataTablePagination table={table} />
    </div>
  );
}