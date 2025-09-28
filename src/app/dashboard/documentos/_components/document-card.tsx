import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Documento, historialData } from "./data";
import { FileText, FileType, FileX, MoreVertical, History, Trash2, Download } from "lucide-react";
import { Badge } from "@/components/ui/badge";

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";

interface DocumentCardProps {
  documento: Documento;
}

const fileIcons = {
  pdf: <FileText className="h-10 w-10 text-red-500" />,
  word: <FileType className="h-10 w-10 text-blue-500" />,
  excel: <FileX className="h-10 w-10 text-green-500" />,
  otro: <FileText className="h-10 w-10 text-gray-500" />,
};

export function DocumentCard({ documento }: DocumentCardProps) {
  const history = historialData[documento.id] || [];
  
  return (
    <Card className="flex flex-col">
      <CardHeader className="flex-row items-start gap-4 space-y-0">
        <div className="flex-shrink-0">{fileIcons[documento.tipoArchivo]}</div>
        <div className="flex-1">
          <CardTitle className="text-base leading-tight hover:underline cursor-pointer">{documento.nombre}</CardTitle>
          <CardDescription>Subido por {documento.subidoPor}</CardDescription>
        </div>
        
        {/* El DropdownMenu ahora contiene toda la lógica de los modales */}
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8 flex-shrink-0">
                    <MoreVertical className="h-4 w-4" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuItem><Download className="mr-2 h-4 w-4" />Descargar</DropdownMenuItem>

                {/* Lógica del Modal de Historial */}
                <Dialog>
                    <DialogTrigger asChild>
                        <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                            <History className="mr-2 h-4 w-4" />Ver Historial
                        </DropdownMenuItem>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-2xl">
                        <DialogHeader><DialogTitle>Historial: {documento.nombre}</DialogTitle></DialogHeader>
                        {/* Contenido del modal de historial... */}
                    </DialogContent>
                </Dialog>

                <DropdownMenuSeparator />

                {/* Lógica del Diálogo de Eliminación */}
                <AlertDialog>
                    <AlertDialogTrigger asChild>
                        <DropdownMenuItem className="text-destructive" onSelect={(e) => e.preventDefault()}>
                             <Trash2 className="mr-2 h-4 w-4" />Eliminar
                        </DropdownMenuItem>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                        <AlertDialogHeader><AlertDialogTitle>¿Está seguro?</AlertDialogTitle></AlertDialogHeader>
                        <AlertDialogDescription>Esta acción eliminará permanentemente {documento.nombre}.</AlertDialogDescription>
                        <AlertDialogFooter>
                            <AlertDialogCancel>Cancelar</AlertDialogCancel>
                            <AlertDialogAction>Eliminar</AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>

            </DropdownMenuContent>
        </DropdownMenu>
      </CardHeader>
      <CardFooter className="flex justify-between items-center text-xs text-muted-foreground mt-auto pt-4">
        <span>Versión: <Badge variant="secondary">{documento.version}</Badge></span>
        <span>{documento.fechaSubida}</span>
      </CardFooter>
    </Card>
  );
}