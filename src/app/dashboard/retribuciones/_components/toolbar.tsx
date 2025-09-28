"use client";

import * as React from "react";
import { Table } from "@tanstack/react-table";
import { DateRange } from "react-day-picker";
import { Download } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DateRangePicker } from "@/components/ui/date-range-picker";

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
}

export function DataTableToolbar<TData>({ table }: DataTableToolbarProps<TData>) {
  const [dateRange, setDateRange] = React.useState<DateRange | undefined>();
  const institutions = Array.from(table.getColumn("institucion")?.getFacetedUniqueValues().keys() ?? []);

  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
      <div className="flex flex-1 flex-col md:flex-row items-center gap-2">
        <DateRangePicker date={dateRange} onDateChange={setDateRange} className="w-full md:w-auto" />
        <Select
          value={(table.getColumn("institucion")?.getFilterValue() as string) ?? "all"}
          onValueChange={(value) => table.getColumn("institucion")?.setFilterValue(value === "all" ? null : value)}
        >
          <SelectTrigger className="h-10 w-full md:w-[200px]">
            <SelectValue placeholder="Filtrar por institución" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todas las instituciones</SelectItem>
            {institutions.map(inst => <SelectItem key={inst} value={inst}>{inst}</SelectItem>)}
          </SelectContent>
        </Select>
      </div>
      <Button variant="outline" size="sm">
        <Download className="mr-2 h-4 w-4" />
        Exportar a Excel
      </Button>
    </div>
  );
}