import { ReportCard } from "./_components/report-card";
import { availableReports } from "./_components/data";

export default function ReportesPage() {
  return (
    <div className="p-4 sm:p-6 md:p-8 space-y-6">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Generación de Reportes</h1>
        <p className="text-muted-foreground">
          Seleccione un tipo de reporte para comenzar a filtrar y visualizar los datos.
        </p>
      </div>
      
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {availableReports.map((report) => (
          <ReportCard key={report.title} report={report} />
        ))}
      </div>
    </div>
  );
}