"use client";

import {
  useReactTable,
  getCoreRowModel,
  flexRender,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Documento } from "./data";
import { columns } from "./columns";
import { DocumentCard } from "./document-card";
import { Card, CardContent } from "@/components/ui/card";

interface DocumentBrowserProps {
  documentos: Documento[];
  view: "list" | "grid";
}

export function DocumentBrowser({ documentos, view }: DocumentBrowserProps) {
  if (view === "list") {
    const table = useReactTable({
      data: documentos,
      columns,
      getCoreRowModel: getCoreRowModel(),
    });

    return (
      <Card>
        <CardContent>
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((hg) => (
                <TableRow key={hg.id}>
                  {hg.headers.map((h) => (
                    <TableHead key={h.id}>
                      {flexRender(h.column.columnDef.header, h.getContext())}
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {documentos.map((doc) => (
        <DocumentCard key={doc.id} documento={doc} />
      ))}
    </div>
  );
}
