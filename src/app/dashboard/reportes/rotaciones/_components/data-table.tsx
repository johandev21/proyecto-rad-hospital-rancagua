"use client";

import * as React from "react";
import { useReactTable, getCoreRowModel, flexRender, getPaginationRowModel } from "@tanstack/react-table";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { RotacionReporte } from "./data";
import { columns } from "./columns";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { DataTablePagination } from "./pagination";

interface DataTableProps {
  data: RotacionReporte[];
}

export function ResultsTable({ data }: DataTableProps) {
  const table = useReactTable({ data, columns, getCoreRowModel: getCoreRowModel(), getPaginationRowModel: getPaginationRowModel() });

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-end">
        <Button variant="outline" size="sm"><Download className="mr-2 h-4 w-4" />Exportar a Excel</Button>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map(hg => (<TableRow key={hg.id}>{hg.headers.map(h => <TableHead key={h.id}>{flexRender(h.column.columnDef.header, h.getContext())}</TableHead>)}</TableRow>))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.map(row => (<TableRow key={row.id}>{row.getVisibleCells().map(cell => <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>)}</TableRow>))}
          </TableBody>
        </Table>
      </div>
      <DataTablePagination table={table} />
    </div>
  );
}