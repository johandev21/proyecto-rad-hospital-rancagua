"use client";

import { Input } from "@/components/ui/input";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { List, Grid } from "lucide-react";
import { UploadDocumentModal } from "./upload-document-modal";
import { categorias } from "./data";
import { Button } from "@/components/ui/button";

interface ToolbarProps {
  view: "list" | "grid";
  onViewChange: (view: "list" | "grid") => void;
  searchTerm: string;
  onSearchChange: (term: string) => void;
}

export function Toolbar({ view, onViewChange, searchTerm, onSearchChange }: ToolbarProps) {
  return (
    <div className="flex flex-wrap gap-y-2 items-center justify-between gap-4">
      <Input
        placeholder="Buscar documentos..."
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        className="h-9 max-w-sm"
      />
      <div className="flex items-center gap-2">
        <ToggleGroup 
          type="single" 
          value={view} 
          onValueChange={onViewChange}
          size="sm"
          className="border"
        >
          <ToggleGroupItem value="list" aria-label="Vista de lista"><List className="h-4 w-4" /></ToggleGroupItem>
          <ToggleGroupItem value="grid" aria-label="Vista de cuadrícula"><Grid className="h-4 w-4" /></ToggleGroupItem>
        </ToggleGroup>
        
        <UploadDocumentModal categorias={categorias}>
          <Button size="sm" className="h-9">
            Subir Documento
          </Button>
        </UploadDocumentModal>
      </div>
    </div>
  );
}