"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Documento, historialData } from "./data";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import {
  MoreHorizontal,
  FileText,
  FileType,
  FileX,
  Download,
  History,
  Trash2,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

// Importa los componentes necesarios
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

const fileIcons = {
  pdf: <FileText className="h-4 w-4 text-red-500" />,
  word: <FileType className="h-4 w-4 text-blue-500" />,
  excel: <FileX className="h-4 w-4 text-green-500" />,
  otro: <FileText className="h-4 w-4 text-gray-500" />,
};

export const columns: ColumnDef<Documento>[] = [
  // ... (otras columnas sin cambios)
  {
    accessorKey: "nombre",
    header: "Nombre",
    cell: ({ row }) => (
      <div className="flex items-center gap-2">
        {fileIcons[row.original.tipoArchivo]}
        <span className="font-medium">{row.getValue("nombre")}</span>
      </div>
    ),
  },
  {
    accessorKey: "version",
    header: "Versión",
    cell: ({ row }) => (
      <Badge variant="secondary">{row.getValue("version")}</Badge>
    ),
  },
  {
    accessorKey: "fechaSubida",
    header: "Fecha de Subida",
  },
  {
    accessorKey: "subidoPor",
    header: "Subido Por",
  },
  {
    id: "actions",
    cell: ({ row }) => (
      <div className="text-right">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>
              <Download className="mr-2 h-4 w-4" />
              Descargar
            </DropdownMenuItem>

            {/* Lógica del Modal de Historial */}
            <Dialog>
              <DialogTrigger asChild>
                <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                  <History className="mr-2 h-4 w-4" />
                  Ver Historial
                </DropdownMenuItem>
              </DialogTrigger>
              <DialogContent className="sm:max-w-2xl">
                {/* Aquí puedes reutilizar el contenido del modal de historial si lo pones en un componente aparte */}
                <DialogHeader>
                  <DialogTitle>Historial: {row.original.nombre}</DialogTitle>
                </DialogHeader>
              </DialogContent>
            </Dialog>

            <DropdownMenuSeparator />

            {/* Lógica del Diálogo de Eliminación */}
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <DropdownMenuItem
                  className="text-destructive"
                  onSelect={(e) => e.preventDefault()}
                >
                  <Trash2 className="mr-2 h-4 w-4" />
                  Eliminar
                </DropdownMenuItem>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>¿Está seguro?</AlertDialogTitle>
                </AlertDialogHeader>
                <AlertDialogDescription>
                  Esta acción eliminará permanentemente {row.original.nombre}.
                </AlertDialogDescription>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancelar</AlertDialogCancel>
                  <AlertDialogAction>Eliminar</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    ),
  },
];
