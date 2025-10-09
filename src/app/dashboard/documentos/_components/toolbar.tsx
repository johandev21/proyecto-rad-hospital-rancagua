"use client";

import * as React from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { List, Grid, Upload } from "lucide-react";
import { UploadDocumentModal } from "./upload-document-modal";

interface ToolbarProps {
  categorias: string[]; 
}

export function Toolbar({ categorias }: ToolbarProps) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const view = searchParams.get("view") || "grid";

  const handleViewChange = (newView: "list" | "grid") => {
    if (!newView) return;
    const params = new URLSearchParams(searchParams);
    params.set("view", newView);
    replace(`${pathname}?${params.toString()}`);
  };

  const handleSearch = useDebouncedCallback((term: string) => {
    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set("q", term);
    } else {
      params.delete("q");
    }
    replace(`${pathname}?${params.toString()}`);
  }, 300);

  return (
    <div className="flex items-center justify-between gap-4">
      <Input
        placeholder="Buscar documentos..."
        defaultValue={searchParams.get("q") || ""}
        onChange={(e) => handleSearch(e.target.value)}
        className="h-9 max-w-sm"
      />
      <div className="flex items-center gap-2">
        <ToggleGroup
          type="single"
          value={view}
          onValueChange={handleViewChange}
          size="sm"
          className="border"
        >
          <ToggleGroupItem value="list">
            <List className="h-4 w-4" />
          </ToggleGroupItem>
          <ToggleGroupItem value="grid">
            <Grid className="h-4 w-4" />
          </ToggleGroupItem>
        </ToggleGroup>

        <UploadDocumentModal categorias={categorias}>
          <Button size="sm" className="h-9">
            <Upload className="mr-2 h-4 w-4" />
            Subir
          </Button>
        </UploadDocumentModal>
      </div>
    </div>
  );
}
