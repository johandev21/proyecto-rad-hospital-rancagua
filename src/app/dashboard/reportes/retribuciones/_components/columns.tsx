"use client";

import { ColumnDef } from "@tanstack/react-table";
import { RetribucionReporte } from "./data";
import { Badge } from "@/components/ui/badge";

const formatCurrency = (amount: number) => new Intl.NumberFormat("es-CL", { style: "currency", currency: "CLP" }).format(amount);

export const columns: ColumnDef<RetribucionReporte>[] = [
  { accessorKey: "institucion", header: "Institución", cell: ({ row }) => <Badge variant="secondary">{row.getValue("institucion")}</Badge> },
  { accessorKey: "servicioClinico", header: "Servicio Clínico" },
  { accessorKey: "alumnos", header: () => <div className="text-right">Alumnos</div>, cell: ({ row }) => <div className="text-right">{row.getValue("alumnos")}</div> },
  { accessorKey: "horasFormativas", header: () => <div className="text-right">Total Horas</div>, cell: ({ row }) => <div className="text-right">{row.getValue("horasFormativas")}</div> },
  { accessorKey: "valorHora", header: () => <div className="text-right">Valor Hora</div>, cell: ({ row }) => <div className="text-right">{formatCurrency(row.getValue("valorHora"))}</div> },
  { accessorKey: "subtotal", header: () => <div className="text-right">Subtotal</div>, cell: ({ row }) => <div className="text-right font-bold">{formatCurrency(row.getValue("subtotal"))}</div> },
];