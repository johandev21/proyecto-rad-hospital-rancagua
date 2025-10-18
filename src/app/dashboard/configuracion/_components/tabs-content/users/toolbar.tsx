"use client";
import * as React from "react";
import { Table } from "@tanstack/react-table";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { UserFormModal } from "./user-form-modal";
import { roles, estados, Usuario } from "./data";
import { Button } from "@/components/ui/button";
import { PlusCircle, X } from "lucide-react";

interface DataTableToolbarProps<TData extends Usuario> {
  table: Table<TData>;
}

export function DataTableToolbar<TData extends Usuario>({
  table,
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0 || !!table.getState().globalFilter;

  const handleResetFilters = () => {
      table.resetColumnFilters();
      table.setGlobalFilter('');
  };

  const roleFilterValue = table.getColumn("rol")?.getFilterValue() as string ?? "all";
  const statusFilterValue = table.getColumn("estado")?.getFilterValue() as string ?? "all";

  return (
    <div className="flex flex-col md:flex-row items-center justify-between gap-4">
       <div className="flex flex-wrap items-center gap-2 flex-1 w-full">
         <Input
           placeholder="Buscar por nombre o correo..."
           value={(table.getState().globalFilter as string) ?? ""} // Connect to global filter state
           onChange={(event) => table.setGlobalFilter(event.target.value)} // Update global filter state
           className="h-8 w-full sm:w-auto sm:min-w-[250px] lg:max-w-xs"
         />
         <Select
            value={roleFilterValue}
            onValueChange={(value) =>
               table.getColumn("rol")?.setFilterValue(value === "all" ? undefined : value)
            }
         >
           <SelectTrigger className="h-8 w-full sm:w-auto">
             <SelectValue placeholder="Filtrar por rol" />
           </SelectTrigger>
           <SelectContent>
             <SelectItem value="all">Todos los roles</SelectItem>
             {roles.map((r) => (
               <SelectItem key={r} value={r}>
                 {r}
               </SelectItem>
             ))}
           </SelectContent>
         </Select>
         <Select
            value={statusFilterValue}
            onValueChange={(value) =>
               table.getColumn("estado")?.setFilterValue(value === "all" ? undefined : value)
            }
         >
           <SelectTrigger className="h-8 w-full sm:w-auto">
             <SelectValue placeholder="Filtrar por estado" />
           </SelectTrigger>
           <SelectContent>
             <SelectItem value="all">Todos los estados</SelectItem>
             {estados.map((e) => (
               <SelectItem key={e} value={e}>
                 {e}
               </SelectItem>
             ))}
           </SelectContent>
         </Select>
         {isFiltered && (
           <Button
             variant="ghost"
             onClick={handleResetFilters}
             className="h-8 px-2 lg:px-3"
           >
             Limpiar Filtros
             <X className="ml-2 h-4 w-4" />
           </Button>
         )}
       </div>
       <div className="w-full md:w-auto flex justify-end">
         <UserFormModal>
           <Button size="sm" className="h-8 w-full md:w-auto">
             <PlusCircle className="mr-2 h-4 w-4" />
             Crear Usuario
           </Button>
         </UserFormModal>
       </div>
    </div>
  );
}