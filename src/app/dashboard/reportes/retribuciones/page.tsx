"use client";

import * as React from "react";
import { FiltersPanel } from "./_components/filters-panel";
import { ResultsTable } from "./_components/data-table";
import { reportData, RetribucionReporte } from "./_components/data";
import { Card, CardContent } from "@/components/ui/card";
import {
  FileSearch,
  CircleDollarSign,
  Hourglass,
  Building,
  TrendingUp,
} from "lucide-react";
import { KpiCard } from "./_components/kpi-card";
import { RetributionsChart } from "./_components/retributions-chart";

const formatCurrency = (amount: number) =>
  new Intl.NumberFormat("es-CL", {
    style: "currency",
    currency: "CLP",
    maximumFractionDigits: 0,
  }).format(amount);

export default function ReporteRetribucionesPage() {
  const [isLoading, setIsLoading] = React.useState(false);
  const [results, setResults] = React.useState<RetribucionReporte[] | null>(
    null
  );

  const kpis = React.useMemo(() => {
    if (!results) return null;

    const totalRetribucion = results.reduce(
      (sum, item) => sum + item.subtotal,
      0
    );
    const totalHoras = results.reduce(
      (sum, item) => sum + item.horasFormativas,
      0
    );

    const institucionUsage = results.reduce((acc, item) => {
      acc[item.institucion] = (acc[item.institucion] || 0) + item.subtotal;
      return acc;
    }, {} as Record<string, number>);

    const institucionMayorAporte =
      Object.keys(institucionUsage).length > 0
        ? Object.keys(institucionUsage).reduce((a, b) =>
            institucionUsage[a] > institucionUsage[b] ? a : b
          )
        : "N/A";

    const costoPromedioHora =
      totalHoras > 0 ? totalRetribucion / totalHoras : 0;

    return {
      totalRetribucion,
      totalHoras,
      institucionMayorAporte,
      costoPromedioHora,
    };
  }, [results]);

  const handleGenerateReport = (filters: any) => {
    setIsLoading(true);
    console.log("Generando reporte de retribuciones con filtros:", filters);
    setTimeout(() => {
      setResults(reportData);
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="p-4 sm:p-6 md:p-8 space-y-6">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
          Reporte de Retribuciones
        </h1>
        <p className="text-muted-foreground">
          Genere reportes detallados sobre las retribuciones económicas para
          auditoría y análisis.
        </p>
      </div>

      <FiltersPanel onGenerate={handleGenerateReport} isLoading={isLoading} />

      <div className="mt-6">
        {isLoading ? (
          <Card className="flex flex-col items-center justify-center py-20">
            <CardContent className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
              <h3 className="mt-4 text-lg font-semibold">
                Generando reporte...
              </h3>
            </CardContent>
          </Card>
        ) : results && kpis ? (
          <div className="space-y-6">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <KpiCard
                title="Retribución Total"
                value={formatCurrency(kpis.totalRetribucion)}
                description="Suma de subtotales"
                icon={CircleDollarSign}
              />
              <KpiCard
                title="Total Horas Formativas"
                value={kpis.totalHoras.toLocaleString("es-CL")}
                description="Horas de uso del campo clínico"
                icon={Hourglass}
              />
              <KpiCard
                title="Institución con Mayor Aporte"
                value={kpis.institucionMayorAporte}
                description="Basado en monto total"
                icon={Building}
              />
              <KpiCard
                title="Costo Promedio por Hora"
                value={formatCurrency(kpis.costoPromedioHora)}
                description="Retribución / Total Horas"
                icon={TrendingUp}
              />
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-1">
                <RetributionsChart data={results} />
              </div>
              <div className="lg:col-span-2">
                <ResultsTable data={results} />
              </div>
            </div>
          </div>
        ) : (
          <Card className="flex flex-col items-center justify-center py-20">
            <CardContent className="text-center">
              <FileSearch className="mx-auto h-12 w-12 text-muted-foreground" />
              <h3 className="mt-4 text-lg font-semibold">
                Aún no se ha generado ningún reporte
              </h3>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
