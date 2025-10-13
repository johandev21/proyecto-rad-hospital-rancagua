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

export default async function SolicitudDeCuposPage() {
  return (
    <div className="p-4 sm:p-6 md:p-8">
      <Card>
        <CardHeader>
          <CardTitle>Gestionar Solicitudes de Cupos</CardTitle>
          <CardDescription>
            Revise, apruebe o rechace las solicitudes de los centros formadores.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <SolicitudesDataTable columns={columns} data={data} />
        </CardContent>
      </Card>
    </div>
  );
}
