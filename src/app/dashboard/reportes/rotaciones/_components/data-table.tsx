"use client";

import * as React from "react";
import { 
    useReactTable, 
    getCoreRowModel, 
    flexRender, 
    getPaginationRowModel,
    getSortedRowModel,
    getFilteredRowModel,
    SortingState,
    ColumnFiltersState,
    VisibilityState,
} from "@tanstack/react-table";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { RotacionReporte } from "./data";
import { columns } from "./columns";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { DataTablePagination } from "@/components/ui/pagination";

interface DataTableProps {
  data: RotacionReporte[];
}

export function ResultsTable({ data }: DataTableProps) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  const table = useReactTable({ 
    data, 
    columns, 
    state: {
      sorting,
      columnVisibility,
      rowSelection,
      columnFilters,
    },
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    getCoreRowModel: getCoreRowModel(), 
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-end">
        <Button variant="outline" size="sm"><Download className="mr-2 h-4 w-4" />Exportar a Excel</Button>
      </div>
      <div className="rounded-md border overflow-y-auto max-h-[530px]">
        <Table noWrapper className="bg-table text-table-foreground">
          <TableHeader className="bg-table-header/90 sticky top-0 z-10">
            {table.getHeaderGroups().map(hg => (
              <TableRow key={hg.id} className="hover:bg-muted/20 backdrop-blur-xl">
                {hg.headers.map(h => (
                  <TableHead key={h.id} className="text-table-header-foreground sticky top-0 z-10">
                    {flexRender(h.column.columnDef.header, h.getContext())}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.map(row => (
              <TableRow 
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
                className="hover:bg-table-row-hover"
              >
                {row.getVisibleCells().map(cell => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <DataTablePagination table={table} />
    </div>
  );
}