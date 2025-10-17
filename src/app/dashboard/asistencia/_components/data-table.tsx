"use client";

import * as React from "react";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getFilteredRowModel,
  ColumnFiltersState,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { DataTableToolbar } from "./toolbar";
import { Asistencia } from "./data";
import { DateRange } from "react-day-picker";
import { DataTablePagination } from "@/components/ui/pagination";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function AsistenciaDataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const [attendanceData, setAttendanceData] = React.useState(data);
  const [originalData, setOriginalData] = React.useState(data);
  const [viewMode, setViewMode] = React.useState<"day" | "range">("day");
  const [date, setDate] = React.useState<Date>(new Date());
  const [dateRange, setDateRange] = React.useState<DateRange | undefined>();
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);

  const hasChanges = JSON.stringify(attendanceData) !== JSON.stringify(originalData);

  const table = useReactTable({
    data: attendanceData,
    columns,
    state: { columnFilters },
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    meta: {
      updateAttendance: (rowIndex: number, newStatus: Asistencia["estado"]) => {
        setAttendanceData((old) =>
          old.map((row, index) => {
            if (index === rowIndex) {
              return { ...old[rowIndex]!, estado: newStatus };
            }
            return row;
          })
        );
      },
    },
  });

  const handleSaveChanges = () => {
    console.log("Datos guardados:", attendanceData);
    setOriginalData(attendanceData);
  };

  React.useEffect(() => {
    if (viewMode === "day") {
      console.log(`Cargando datos para el DÍA: ${date.toISOString().split("T")[0]}`);
    } else if (viewMode === "range" && dateRange?.from && dateRange?.to) {
      console.log(
        `Cargando datos para el RANGO: ${
          dateRange.from.toISOString().split("T")[0]
        } a ${dateRange.to.toISOString().split("T")[0]}`
      );
    }
  }, [date, dateRange, viewMode]);

  return (
    <div className="space-y-4">
      <DataTableToolbar
        table={table}
        viewMode={viewMode}
        setViewMode={setViewMode}
        date={date}
        setDate={setDate}
        dateRange={dateRange}
        setDateRange={setDateRange}
        hasChanges={hasChanges}
        onSaveChanges={handleSaveChanges}
      />
      <div className="rounded-md border overflow-y-auto max-h-[530px]">
        <Table noWrapper className="bg-table text-table-foreground">
          <TableHeader className="bg-table-header/90 sticky top-0 z-10">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className="hover:bg-muted/20 backdrop-blur-xl">
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id} className="text-table-header-foreground sticky top-0 z-10">
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id} className="hover:bg-table-row-hover">
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow className="hover:bg-table-row-hover">
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No hay alumnos en rotación para la fecha seleccionada.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <DataTablePagination table={table} />
    </div>
  );
}