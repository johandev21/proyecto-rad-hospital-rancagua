"use client";

import * as React from "react";
import { FiltersPanel } from "./_components/filters-panel";
import { reportData, OcupacionReporte } from "./_components/data";
import { Card, CardContent } from "@/components/ui/card";
import { FileSearch, BarChart3, TrendingUp, TrendingDown, Hourglass, Percent } from "lucide-react";
import { OcupacionChart } from "./_components/ocupacion-chart";
import { KpiCard } from "./_components/kpi-card";
import { OcupacionTable } from "./_components/ocupacion-table";

export default function ReporteOcupacionPage() {
  const [isLoading, setIsLoading] = React.useState(false);
  const [results, setResults] = React.useState<OcupacionReporte[] | null>(null);

  const kpis = React.useMemo(() => {
    if (!results) return null;
    
    const totalHoras = results.reduce((sum, item) => sum + item.horasFormativas, 0);
    const promedioOcupacion = results.reduce((sum, item) => sum + item.ocupacion, 0) / results.length;
    const mayorOcupacion = results.reduce((max, item) => item.ocupacion > max.ocupacion ? item : max, results[0]);
    const menorOcupacion = results.reduce((min, item) => item.ocupacion < min.ocupacion ? item : min, results[0]);
    
    return { totalHoras, promedioOcupacion, mayorOcupacion, menorOcupacion };
  }, [results]);

  const handleGenerateReport = (filters: any) => {
    setIsLoading(true);
    console.log("Generando reporte de ocupación con filtros:", filters);
    
    setTimeout(() => {
      setResults(reportData);
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="p-4 sm:p-6 md:p-8 space-y-6">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Reporte de Ocupación</h1>
        <p className="text-muted-foreground">
          Analice el uso de los servicios clínicos a través del tiempo.
        </p>
      </div>
      
      <FiltersPanel onGenerate={handleGenerateReport} isLoading={isLoading} />
      
      <div className="mt-6">
        {isLoading ? (
          <Card className="flex flex-col items-center justify-center py-20"><CardContent className="text-center"><BarChart3 className="mx-auto h-12 w-12 text-muted-foreground animate-pulse" /><h3 className="mt-4 text-lg font-semibold">Generando reporte...</h3></CardContent></Card>
        ) : results && kpis ? (
          <div className="space-y-6">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <KpiCard title="Servicio con Mayor Ocupación" value={`${kpis.mayorOcupacion.servicio}`} description={`${kpis.mayorOcupacion.ocupacion.toFixed(1)}% de ocupación`} icon={TrendingUp} />
              <KpiCard title="Servicio con Menor Ocupación" value={`${kpis.menorOcupacion.servicio}`} description={`${kpis.menorOcupacion.ocupacion.toFixed(1)}% de ocupación`} icon={TrendingDown} />
              <KpiCard title="Promedio de Ocupación" value={`${kpis.promedioOcupacion.toFixed(1)}%`} description="En todos los servicios" icon={Percent} />
              <KpiCard title="Total Horas Formativas" value={kpis.totalHoras.toLocaleString('es-CL')} description="En el período seleccionado" icon={Hourglass} />
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
              <div className="lg:col-span-3">
                <OcupacionChart data={results} />
              </div>
              <div className="lg:col-span-2">
                <OcupacionTable data={results} />
              </div>
            </div>
          </div>
        ) : (
          <Card className="flex flex-col items-center justify-center py-20"><CardContent className="text-center"><FileSearch className="mx-auto h-12 w-12 text-muted-foreground" /><h3 className="mt-4 text-lg font-semibold">Aún no se ha generado ningún reporte</h3></CardContent></Card>
        )}
      </div>
    </div>
  );
}