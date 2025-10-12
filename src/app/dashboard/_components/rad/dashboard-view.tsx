import { KpiCard } from "./kpi-card";
import { OverviewChart } from "./overview-chart";
import { Activity, CircleDollarSign, ClipboardList, Users } from "lucide-react";
import { RotacionesRecientes } from "./rotaciones-recientes";

const kpiData = [
  {
    title: "Solicitudes Pendientes",
    value: "12",
    icon: ClipboardList,
    description: "Requieren aprobación para el próximo período.",
    href: "/dashboard/solicitud-de-cupos",
  },
  {
    title: "Alumnos en Rotación Hoy",
    value: "78",
    icon: Activity,
    description: "Estudiantes activos en los servicios clínicos.",
    href: "/dashboard/programacion",
  },
  {
    title: "Cupos Disponibles",
    value: "+23",
    icon: Users,
    description: "Para los próximos 30 días.",
    href: "/dashboard/capacidad-formadora",
  },
  {
    title: "Retribución (Mes en curso)",
    value: "$1.2M",
    icon: CircleDollarSign,
    description: "Calculado basado en el uso actual.",
    href: "/dashboard/retribuciones",
  },
];

export function DashboardViewRAD() {
  return (
    <div className="p-4 sm:p-6 md:p-8 space-y-6">
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2">
        <div>
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Panel de Administrador</h1>
            <p className="text-muted-foreground">Una vista general y consolidada de la gestión de campos clínicos.</p>
        </div>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {kpiData.map((item) => (
          <KpiCard key={item.title} {...item} />
        ))}
      </div>
      
      <div className="grid gap-4 lg:grid-cols-3">
        <div className="lg:col-span-2">
            <OverviewChart />
        </div>
        <div>
            <RotacionesRecientes />
        </div>
      </div>
    </div>
  );
}