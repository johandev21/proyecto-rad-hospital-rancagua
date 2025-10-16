import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { SolicitudesDataTable } from "./_components/data-table";
import { columns } from "./_components/columns";
import { data } from "./_components/data";

export default function SolicitudDeCuposPage() {
  return (
    <div className="p-4 sm:p-6 md:p-8">
      <Card>
        <CardHeader>
          <CardTitle className="text-xl md:text-2xl font-bold">
            Mis Solicitudes de Cupos
          </CardTitle>
          <CardDescription>
            Crea nuevas solicitudes y gestiona el estado de las existentes.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <SolicitudesDataTable columns={columns} data={data} />
        </CardContent>
      </Card>
    </div>
  );
}