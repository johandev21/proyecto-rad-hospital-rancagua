import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { columns } from "./_components/columns";
import { data } from "./_components/data";
import { RetribucionesDataTable } from "./_components/data-table";
import { KpiCard } from "./_components/kpi-card";
import { Activity, Building, CircleDollarSign, GraduationCap } from "lucide-react";

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat("es-CL", {
    style: "currency",
    currency: "CLP",
    maximumFractionDigits: 0,
  }).format(amount);
};

async function getRetribucionesData() {
  const totalRetribucion = data.reduce((sum, item) => sum + item.subtotal, 0);
  const totalHoras = data.reduce((sum, item) => sum + item.horasFormativas, 0);

  const institucionUsage = data.reduce((acc, item) => {
    acc[item.institucion] = (acc[item.institucion] || 0) + item.subtotal;
    return acc;
  }, {} as Record<string, number>);
  
  const institucionMayorUso = Object.keys(institucionUsage).reduce((a, b) => institucionUsage[a] > institucionUsage[b] ? a : b, '');

  return { data, totalRetribucion, totalHoras, institucionMayorUso };
}

export default async function RetribucionesPage() {
  const { data, totalRetribucion, totalHoras, institucionMayorUso } = await getRetribucionesData();

  return (
    <div className="p-4 sm:p-6 md:p-8 space-y-6">
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Retribuciones y Uso</h1>
          <p className="text-muted-foreground">
            Calcula y visualiza las retribuciones económicas basadas en el uso del campo clínico.
          </p>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <KpiCard
          title="Retribución Total"
          value={formatCurrency(totalRetribucion)}
          description="En el período seleccionado"
          icon={CircleDollarSign}
        />
        <KpiCard
          title="Total Horas Formativas"
          value={totalHoras.toLocaleString('es-CL')}
          description="Horas de uso del campo clínico"
          icon={Activity}
        />
        <KpiCard
          title="Institución con Mayor Uso"
          value={institucionMayorUso}
          description="Basado en monto de retribución"
          icon={Building}
        />
         <KpiCard
          title="Servicios Activos"
          value={String(new Set(data.map(item => item.servicioClinico)).size)}
          description="Servicios con rotaciones activas"
          icon={GraduationCap}
        />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Desglose de Retribuciones</CardTitle>
          <CardDescription>
            Detalle del cálculo por institución y servicio clínico para el período seleccionado.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <RetribucionesDataTable columns={columns} data={data} />
        </CardContent>
      </Card>
    </div>
  );
}