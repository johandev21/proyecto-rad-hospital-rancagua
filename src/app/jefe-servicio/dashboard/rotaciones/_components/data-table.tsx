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
  FilterFn,
} from "@tanstack/react-table";
import { rankItem, RankingInfo } from "@tanstack/match-sorter-utils";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { DataTablePagination } from "@/components/ui/pagination";
import { RotacionesToolbar } from "./toolbar";
import { RotacionServicio, Alumno } from "./data";
import { Separator } from "@/components/ui/separator";
import { Phone, Mail, User, ShieldAlert } from "lucide-react";

declare module "@tanstack/react-table" {
  interface FilterFns {
    fuzzy: FilterFn<unknown>;
  }
  interface FilterMeta {
    itemRank: RankingInfo;
  }
}

const fuzzyFilter: FilterFn<any> = (row, columnId, value, addMeta) => {
  const itemRank = rankItem(row.getValue(columnId), value);
  addMeta({ itemRank });
  return itemRank.passed;
};

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function RotacionesDataTable<TData extends RotacionServicio, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [globalFilter, setGlobalFilter] = React.useState("");

  const table = useReactTable({
    data,
    columns,
    filterFns: { fuzzy: fuzzyFilter },
    state: { sorting, columnFilters, globalFilter },
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onGlobalFilterChange: setGlobalFilter,
    globalFilterFn: fuzzyFilter,
    getRowCanExpand: (row) =>
      !!row.original.alumnosAsignados &&
      row.original.alumnosAsignados.length > 0,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getExpandedRowModel: getExpandedRowModel(),
  });

  const AlumnoDetail = ({ alumno }: { alumno: Alumno }) => (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-2 p-3 border rounded bg-card mb-2 shadow-sm">
      {/* Nombre y RUT */}
      <div className="lg:col-span-1 flex flex-col">
        <span className="text-xs text-muted-foreground">Alumno</span>
        <span className="font-medium">{`${alumno.nombre} ${alumno.primerApellido} ${alumno.segundoApellido}`}</span>
        <span className="text-sm text-muted-foreground">{alumno.rut}</span>
      </div>
      {/* Contacto Alumno */}
      <div className="lg:col-span-1 flex flex-col space-y-1">
        <span className="text-xs text-muted-foreground">Contacto Alumno</span>
        <div className="flex items-center gap-2 text-sm">
          <Phone className="h-3 w-3 flex-shrink-0" />
          <span className="truncate">{alumno.telefono || "N/A"}</span>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <Mail className="h-3 w-3 flex-shrink-0" />
          <span className="truncate">{alumno.correo || "N/A"}</span>
        </div>
      </div>
      {/* Contacto Emergencia */}
      <div className="lg:col-span-1 flex flex-col space-y-1">
        <span className="text-xs text-muted-foreground">
          Contacto Emergencia
        </span>
        <div className="flex items-center gap-2 text-sm">
          <User className="h-3 w-3 flex-shrink-0" />
          <span className="truncate">{alumno.nombreEmergencia || "N/A"}</span>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <ShieldAlert className="h-3 w-3 flex-shrink-0" />
          <span className="truncate">{alumno.telefonoEmergencia || "N/A"}</span>
        </div>
      </div>
      {/* Institución */}
      <div className="lg:col-span-1 flex flex-col">
        <span className="text-xs text-muted-foreground">Institución</span>
        <span className="text-sm">{alumno.institucion}</span>
      </div>
    </div>
  );

  return (
    <div className="space-y-4">
      <RotacionesToolbar table={table} />
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <React.Fragment key={row.id}>
                  <TableRow data-state={row.getIsSelected() && "selected"}>
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                  {row.getIsExpanded() && (
                    <TableRow className="bg-muted/50 hover:bg-muted/50 border-b">
                      <TableCell />
                      <TableCell colSpan={columns.length - 1} className="p-4">
                        <div className="space-y-3 max-w-4xl">
                          <h4 className="text-md font-semibold">
                            Alumnos Asignados (
                            {row.original.alumnosAsignados.length})
                          </h4>
                          <Separator />
                          {row.original.alumnosAsignados.map(
                            (alumno: Alumno) => (
                              <AlumnoDetail key={alumno.id} alumno={alumno} />
                            )
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  )}
                </React.Fragment>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No se encontraron rotaciones con los filtros aplicados.
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
