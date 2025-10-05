import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { columns } from "./_components/centro-formador/columns";
import { data } from "./_components/centro-formador/data";
import { DataTable } from "./_components/centro-formador/data-table";
import { SolicitudesDataTable } from "./_components/rad/data-table";

async function getUserRole() {
  return "CentroFormador";
}

function ViewCentroFormador() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Mis Solicitudes de Cupos</CardTitle>
        <CardDescription>
          Cree, gestione y haga seguimiento de todas sus solicitudes de cupos.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <DataTable columns={columns} data={data} />
      </CardContent>
    </Card>
  );
}

function ViewRAD() {
  return (
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
  );
}

export default async function SolicitudDeCuposPage() {
  const userRole = await getUserRole();

  return (
    <div className="p-4 sm:p-6 md:p-8">
      {userRole === "CentroFormador" && <ViewCentroFormador />}
      {userRole === "RAD" && <ViewRAD />}
    </div>
  );
}
