"use client";

import * as React from "react";
import { FiltersPanel } from "./_components/filters-panel";
import { ResultsTable } from "./_components/data-table";
import { reportData, RotacionReporte } from "./_components/data";
import { Card, CardContent } from "@/components/ui/card";
import {
  FileSearch,
  Users,
  Building,
  GraduationCap,
  ClipboardCheck,
} from "lucide-react";
import { KpiCard } from "./_components/kpi-card";

export default function ReporteRotacionesPage() {
  const [isLoading, setIsLoading] = React.useState(false);
  const [results, setResults] = React.useState<RotacionReporte[] | null>(null);

  const kpis = React.useMemo(() => {
    if (!results) return null;

    const totalRotaciones = results.length;
    const instituciones = new Set(results.map((r) => r.alumno.institucion))
      .size;
    const carreras = new Set(results.map((r) => r.carrera)).size;
    const finalizadas = results.filter((r) => r.estado === "Finalizada").length;

    return { totalRotaciones, instituciones, carreras, finalizadas };
  }, [results]);

  const handleGenerateReport = (filters: any) => {
    setIsLoading(true);
    console.log("Generando reporte de rotaciones con filtros:", filters);
    setTimeout(() => {
      setResults(reportData);
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="p-4 sm:p-6 md:p-8 space-y-6">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
          Reporte de Rotaciones
        </h1>
        <p className="text-muted-foreground">
          Filtre y visualice el historial de rotaciones para análisis y
          auditoría.
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
              <p className="mt-1 text-sm text-muted-foreground">
                Por favor espere un momento.
              </p>
            </CardContent>
          </Card>
        ) : results && kpis ? (
          <div className="space-y-6">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <KpiCard
                title="Total de Rotaciones"
                value={kpis.totalRotaciones.toString()}
                description="En el período y filtros seleccionados"
                icon={Users}
              />
              <KpiCard
                title="Instituciones Involucradas"
                value={kpis.instituciones.toString()}
                description="Número de instituciones únicas"
                icon={Building}
              />
              <KpiCard
                title="Carreras Involucradas"
                value={kpis.carreras.toString()}
                description="Número de carreras únicas"
                icon={GraduationCap}
              />
              <KpiCard
                title="Rotaciones Finalizadas"
                value={kpis.finalizadas.toString()}
                description="Del total de rotaciones encontradas"
                icon={ClipboardCheck}
              />
            </div>
            <ResultsTable data={results} />
          </div>
        ) : (
          <Card className="flex flex-col items-center justify-center py-20">
            <CardContent className="text-center">
              <FileSearch className="mx-auto h-12 w-12 text-muted-foreground" />
              <h3 className="mt-4 text-lg font-semibold">
                Aún no se ha generado ningún reporte
              </h3>
              <p className="mt-1 text-sm text-muted-foreground">
                Utilice los filtros de arriba para generar los datos.
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
