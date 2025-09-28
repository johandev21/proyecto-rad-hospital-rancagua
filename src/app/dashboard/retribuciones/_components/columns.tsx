"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Retribucion } from "./data";
import { Badge } from "@/components/ui/badge";

// Helper para formatear números como moneda CLP
const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat("es-CL", {
    style: "currency",
    currency: "CLP",
  }).format(amount);
};

export const columns: ColumnDef<Retribucion>[] = [
  {
    accessorKey: "institucion",
    header: "Institución",
    cell: ({ row }) => <Badge variant="outline">{row.getValue("institucion")}</Badge>,
  },
  {
    accessorKey: "servicioClinico",
    header: "Servicio Clínico",
  },
  {
    accessorKey: "alumnos",
    header: () => <div className="text-right">N° Alumnos</div>,
    cell: ({ row }) => <div className="text-right">{row.getValue("alumnos")}</div>,
  },
  {
    accessorKey: "horasFormativas",
    header: () => <div className="text-right">Total Horas</div>,
    cell: ({ row }) => <div className="text-right">{row.getValue("horasFormativas")}</div>,
  },
  {
    accessorKey: "valorHora",
    header: () => <div className="text-right">Valor Hora</div>,
    cell: ({ row }) => <div className="text-right">{formatCurrency(row.getValue("valorHora"))}</div>,
  },
  {
    accessorKey: "subtotal",
    header: () => <div className="text-right">Subtotal</div>,
    cell: ({ row }) => <div className="text-right font-medium">{formatCurrency(row.getValue("subtotal"))}</div>,
  },
];