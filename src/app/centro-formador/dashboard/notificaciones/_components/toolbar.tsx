"use client";

import { Table } from "@tanstack/react-table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Archive, CheckCheck, X } from "lucide-react";

interface NotificacionesToolbarProps<TData extends { id: string }> {
  table: Table<TData>;
}

export function NotificacionesToolbar<TData extends { id: string }>({
  table,
}: NotificacionesToolbarProps<TData>) {
  const numSelected = table.getFilteredSelectedRowModel().rows.length;

  const handleStatusChange = (value: string) => {
    const statusMap: { [key: string]: boolean | null } = {
      'leidas': true,
      'no-leidas': false,
      'todas': null,
    };
    const filterValue = statusMap[value];
    
    if (filterValue === null) {
      table.getColumn("leida")?.setFilterValue(undefined);
    } else {
      table.getColumn("leida")?.setFilterValue(filterValue);
    }
  };

  const handleMarkAsRead = () => {
    const selectedIds = table.getFilteredSelectedRowModel().rows.map(row => row.original.id);
    console.log("Marcar como leídas las notificaciones:", selectedIds);
    table.toggleAllPageRowsSelected(false);
  };

  const handleArchive = () => {
    const selectedIds = table.getFilteredSelectedRowModel().rows.map(row => row.original.id);
    console.log("Archivar las notificaciones:", selectedIds);
    table.toggleAllPageRowsSelected(false);
  };

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
      {numSelected > 0 ? (
        <div className="flex w-full sm:w-auto items-center gap-2">
           <Button
            variant="outline"
            size="sm"
            className="h-9"
            onClick={handleMarkAsRead}
          >
            <CheckCheck className="mr-2 h-4 w-4" />
            Marcar como leídas ({numSelected})
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="h-9"
            onClick={handleArchive}
          >
            <Archive className="mr-2 h-4 w-4" />
            Archivar
          </Button>
           <Button
            variant="ghost"
            size="icon"
            className="h-9 w-9"
            onClick={() => table.toggleAllPageRowsSelected(false)}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      ) : (
        <div className="flex w-full sm:w-auto flex-1 items-center gap-4">
          <Input
            placeholder="Buscar en notificaciones..."
            value={(table.getColumn("main")?.getFilterValue() as string) ?? ""}
            onChange={(event) => table.getColumn("main")?.setFilterValue(event.target.value)}
            className="h-9 max-w-sm"
          />
          <ToggleGroup
            type="single"
            defaultValue="todas"
            variant="outline"
            onValueChange={handleStatusChange}
            className="hidden md:flex md:w-[300px]"
          >
            <ToggleGroupItem value="todas" aria-label="Ver todas">
              Todas
            </ToggleGroupItem>
            <ToggleGroupItem value="no-leidas" aria-label="Ver no leídas">
              No Leídas
            </ToggleGroupItem>
            <ToggleGroupItem value="leidas" aria-label="Ver leídas">
              Leídas
            </ToggleGroupItem>
          </ToggleGroup>
        </div>
      )}
    </div>
  );
}