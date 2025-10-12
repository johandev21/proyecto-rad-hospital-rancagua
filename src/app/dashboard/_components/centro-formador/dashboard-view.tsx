import { kpiData } from "./data/centro-formador-data";
import { KpiCard } from "./kpi-card";
import { PendingTasks } from "./pending-tasks";
import { RecentRequestsTable } from "./recent-requests-table";

export function DashboardViewCentro() {
  return (
    <div className="p-4 sm:p-6 md:p-8 space-y-6">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Panel de Inicio - Centro Formador</h1>
        <p className="text-muted-foreground">Bienvenido, aquí tienes un resumen de tu actividad.</p>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 min-w-0">
        {kpiData.map(kpi => <KpiCard key={kpi.title} {...kpi} />)}
      </div>
      <div className="grid gap-6 lg:grid-cols-3 min-w-0">
        <div className="lg:col-span-1">
          <PendingTasks />
        </div>
        <div className="lg:col-span-2 min-w-0">
          <RecentRequestsTable />
        </div>
      </div>
    </div>
  );
}