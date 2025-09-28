"use client";

import * as React from "react";
import { useReactTable, getCoreRowModel, flexRender, ColumnDef } from "@tanstack/react-table";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Documento } from "./data";
import { columns } from "./columns";
import { Toolbar } from "./toolbar";
import { DocumentCard } from "./document-card";

interface DocumentBrowserProps {
  documentos: Documento[];
}

export function DocumentBrowser({ documentos }: DocumentBrowserProps) {
  const [view, setView] = React.useState<"list" | "grid">("grid");
  const [searchTerm, setSearchTerm] = React.useState("");

  const filteredDocuments = documentos.filter(doc => 
    doc.nombre.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const table = useReactTable({
    data: filteredDocuments,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="space-y-4">
      <Toolbar 
        view={view} 
        onViewChange={(v) => { if(v) setView(v) }} 
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
      />
      {view === "list" ? (
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map(hg => (
                <TableRow key={hg.id}>
                  {hg.headers.map(h => (
                    <TableHead key={h.id}>{flexRender(h.column.columnDef.header, h.getContext())}</TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows.map(row => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map(cell => (
                    <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredDocuments.map(doc => (
            <DocumentCard key={doc.id} documento={doc} />
          ))}
        </div>
      )}
    </div>
  );
}