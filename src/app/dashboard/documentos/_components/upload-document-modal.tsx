"use client";

import * as React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { UploadCloud, File as FileIcon, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface UploadDocumentModalProps {
  categorias: string[];
  children: React.ReactNode;
}

export function UploadDocumentModal({ categorias, children }: UploadDocumentModalProps) {
  const [file, setFile] = React.useState<File | null>(null);
  const [isDragging, setIsDragging] = React.useState(false);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const handleFileChange = (selectedFile: File | undefined) => {
    if (selectedFile) {
      setFile(selectedFile);
    }
  };
  
  const handleDragEvents = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };
  
  const handleDragOver = (e: React.DragEvent) => {
    handleDragEvents(e);
    setIsDragging(true);
  };
  
  const handleDragLeave = (e: React.DragEvent) => {
    handleDragEvents(e);
    setIsDragging(false);
  };
  
  const handleDrop = (e: React.DragEvent) => {
    handleDragEvents(e);
    setIsDragging(false);
    const droppedFile = e.dataTransfer.files[0];
    handleFileChange(droppedFile);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Subir Nuevo Documento</DialogTitle>
          <DialogDescription>
            Seleccione o arrastre un archivo y complete los detalles a continuación.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div 
            className={cn(
                "flex flex-col items-center justify-center w-full p-6 border-2 border-dashed rounded-lg cursor-pointer transition-colors",
                isDragging ? "border-primary bg-muted" : "border-border"
            )}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
          >
            {file ? (
                <div className="text-center">
                    <FileIcon className="mx-auto h-12 w-12 text-muted-foreground" />
                    <p className="font-semibold">{file.name}</p>
                    <p className="text-xs text-muted-foreground">{(file.size / 1024).toFixed(2)} KB</p>
                    <Button variant="link" size="sm" className="text-destructive h-auto p-0 mt-2" onClick={(e) => { e.stopPropagation(); setFile(null); }}>
                        <X className="mr-1 h-3 w-3" /> Quitar archivo
                    </Button>
                </div>
            ) : (
                <div className="text-center text-muted-foreground">
                    <UploadCloud className="mx-auto h-12 w-12" />
                    <p className="font-semibold">Arrastre y suelte el archivo aquí</p>
                    <p className="text-xs">o haga clic para seleccionarlo</p>
                </div>
            )}
            <Input ref={fileInputRef} type="file" className="hidden" onChange={(e) => handleFileChange(e.target.files?.[0])} />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">Nombre</Label>
            <Input id="name" defaultValue={file?.name} className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="category" className="text-right">Categoría</Label>
            <Select>
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Seleccione una categoría" />
              </SelectTrigger>
              <SelectContent>
                {categorias.filter(c => c !== "Todos").map(cat => <SelectItem key={cat} value={cat}>{cat}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>
           <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="notes" className="text-right">Notas de Versión</Label>
            <Textarea id="notes" placeholder="Describa los cambios en esta versión..." className="col-span-3" />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit" disabled={!file}>Subir Archivo</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}