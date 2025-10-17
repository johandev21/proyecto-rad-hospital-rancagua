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
  VisibilityState,
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
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  const table = useReactTable({
    data,
    columns,
    state: { 
      sorting, 
      columnFilters,
      columnVisibility,
      rowSelection,
    },
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
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
      <div className="rounded-md border overflow-y-auto max-h-[530px]">
        <Table noWrapper className="bg-table text-table-foreground">
          <TableHeader className="bg-table-header/90 sticky top-0 z-10">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className="hover:bg-muted/20 backdrop-blur-xl">
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id} className="text-table-header-foreground sticky top-0 z-10">
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
                  <TableRow 
                    data-state={row.getIsSelected() && "selected"}
                    className="hover:bg-table-row-hover"
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </TableCell>
                    ))}
                  </TableRow>
                  
                  {row.getIsExpanded() && (
                    <TableRow className="bg-muted/50 hover:bg-muted/50">
                      <TableCell colSpan={columns.length} className="p-4">
                        <div className="space-y-2">
                            <h4 className="text-md font-semibold">Alumnos Asignados a la Rotación</h4>
                            <Separator />
                            <div className="rounded-md bg-background/50">
                              {row.original.alumnosAsignados.map((alumno) => (
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
              <TableRow className="hover:bg-table-row-hover">
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