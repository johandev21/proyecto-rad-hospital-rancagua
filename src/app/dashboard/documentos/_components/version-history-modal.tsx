"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Documento, historialData } from "./data";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

interface VersionHistoryModalProps {
  documento: Documento;
  children: React.ReactNode;
}

export function VersionHistoryModal({ documento, children }: VersionHistoryModalProps) {
  const history = historialData[documento.id] || [];

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-xl">Historial de Versiones: {documento.nombre}</DialogTitle>
        </DialogHeader>
        <div className="py-4">
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Versión</TableHead>
                  <TableHead>Fecha</TableHead>
                  <TableHead>Subido Por</TableHead>
                  <TableHead>Notas</TableHead>
                  <TableHead></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {history.map((version) => (
                  <TableRow key={version.version} className={version.version === documento.version ? "bg-muted/50" : ""}>
                    <TableCell>
                      <Badge variant={version.version === documento.version ? "default" : "secondary"}>
                        {version.version}
                      </Badge>
                      {version.version === documento.version && <span className="text-xs ml-2 text-muted-foreground">(Actual)</span>}
                    </TableCell>
                    <TableCell>{version.fechaSubida}</TableCell>
                    <TableCell>{version.subidoPor}</TableCell>
                    <TableCell className="text-sm text-muted-foreground">{version.notas}</TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Download className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}