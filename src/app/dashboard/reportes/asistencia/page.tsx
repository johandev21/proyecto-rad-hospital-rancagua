"use client";

import * as React from "react";
import { FiltersPanel } from "./_components/filters-panel";
import { ResultsTable } from "./_components/results-table";
import { reportData, AsistenciaReporte } from "./_components/data";
import { Card, CardContent } from "@/components/ui/card";
import { FileSearch } from "lucide-react";

export default function ReporteAsistenciaPage() {
  const [isLoading, setIsLoading] = React.useState(false);
  const [results, setResults] = React.useState<AsistenciaReporte[] | null>(
    null
  );

  const handleGenerateReport = (filters: any) => {
    setIsLoading(true);
    console.log("Generando reporte con filtros:", filters);

    setTimeout(() => {
      setResults(reportData);
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="p-4 sm:p-6 md:p-8 space-y-6">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
          Reporte de Asistencia
        </h1>
        <p className="text-muted-foreground">
          Utilice los filtros para generar un reporte de asistencia
          personalizado.
        </p>
      </div>

      <FiltersPanel onGenerate={handleGenerateReport} isLoading={isLoading} />

      <div className="mt-6">
        {results ? (
          <ResultsTable data={results} />
        ) : (
          <Card className="flex flex-col items-center justify-center py-20">
            <CardContent className="text-center">
              <FileSearch className="mx-auto h-12 w-12 text-muted-foreground" />
              <h3 className="mt-4 text-lg font-semibold">
                {isLoading
                  ? "Generando reporte..."
                  : "Aún no se ha generado ningún reporte"}
              </h3>
              <p className="mt-1 text-sm text-muted-foreground">
                {isLoading
                  ? "Por favor espere un momento."
                  : "Utilice los filtros de arriba y haga clic en 'Generar'."}
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
