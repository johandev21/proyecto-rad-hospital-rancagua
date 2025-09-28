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

export default function SolicitudDeCuposRoute() {
  return (
    <div className="p-4 sm:p-6 md:p-8">
      <Card className="bg-card/80">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Solicitud de Cupos</CardTitle>
          <CardDescription>
            Gestiona las solicitudes de cupos de las distintas instituciones.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <SolicitudesDataTable columns={columns} data={data} />
        </CardContent>
      </Card>
    </div>
  );
}