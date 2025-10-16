"use client";

import { Table } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { X } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ModalAgregarSolicitud } from "./modal-agregar-solicitud";

interface SolicitudesToolbarProps<TData> {
  table: Table<TData>;
}

export function SolicitudesToolbar<TData>({
  table,
}: SolicitudesToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0;

  return (
    <div className="flex flex-col md:flex-row items-center justify-between gap-4">
       <div className="flex flex-1 flex-col sm:flex-row items-center gap-2 w-full">
         <Input
           placeholder="Filtrar por carrera, servicio..."
           value={(table.getColumn("carrera")?.getFilterValue() as string) ?? ""}
           onChange={(event) =>
             table.getColumn("carrera")?.setFilterValue(event.target.value)
           }
           className="h-9 w-full sm:w-auto sm:min-w-[200px]"
         />
         <Select
            value={(table.getColumn("status")?.getFilterValue() as string) ?? "all"}
            onValueChange={(value) =>
               table.getColumn("status")?.setFilterValue(value === "all" ? null : value)
            }
         >
            <SelectTrigger className="h-9 w-full sm:w-[180px]">
               <SelectValue placeholder="Estado" />
            </SelectTrigger>
            <SelectContent>
               <SelectItem value="all">Todos los Estados</SelectItem>
               <SelectItem value="Pendiente">Pendiente</SelectItem>
               <SelectItem value="Aprobada">Aprobada</SelectItem>
               <SelectItem value="Rechazada">Rechazada</SelectItem>
            </SelectContent>
         </Select>
         {isFiltered && (
           <Button
             variant="ghost"
             onClick={() => table.resetColumnFilters()}
             className="h-9 px-2 lg:px-3"
           >
             Resetear
             <X className="ml-2 h-4 w-4" />
           </Button>
         )}
       </div>

       <div className="w-full md:w-auto">
          <ModalAgregarSolicitud />
       </div>
    </div>
  );
}