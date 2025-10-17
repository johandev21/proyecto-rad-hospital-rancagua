"use client";

import { useReactTable, getCoreRowModel, flexRender } from "@tanstack/react-table";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { OcupacionReporte } from "./data";
import { columns } from "./columns";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface OcupacionTableProps {
  data: OcupacionReporte[];
}

export function OcupacionTable({ data }: OcupacionTableProps) {
  const table = useReactTable({ data, columns, getCoreRowModel: getCoreRowModel() });

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
            <div>
                <CardTitle>Datos Detallados</CardTitle>
                <CardDescription>Desglose numérico por servicio clínico.</CardDescription>
            </div>
            <Button variant="outline" size="sm"><Download className="mr-2 h-4 w-4" />Exportar</Button>
        </div>
      </CardHeader>
      <CardContent>
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
                <TableRow key={row.id} className="hover:bg-table-row-hover">
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
      </CardContent>
    </Card>
  );
}