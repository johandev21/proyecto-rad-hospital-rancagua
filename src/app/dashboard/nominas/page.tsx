import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { columns } from "./_components/columns";
import { data } from "./_components/data";
import { DataTable } from "./_components/data-table";

export default async function NominasPage() {
  const nominasData = data;

  return (
    <div className="p-4 sm:p-6 md:p-8">
      <Card>
        <CardHeader>
          <CardTitle>Gestión de Nóminas de Alumnos</CardTitle>
          <CardDescription>
            Envíe y gestione las listas de alumnos para los cupos de rotación
            aprobados.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <DataTable columns={columns} data={nominasData} />
        </CardContent>
      </Card>
    </div>
  );
}
