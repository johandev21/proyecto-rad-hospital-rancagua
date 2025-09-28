import { columns } from "./_components/columns";
import { data } from "./_components/data";
import { AsistenciaDataTable } from "./_components/data-table";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

async function getAttendanceDataForToday() {
  return data;
}

export default async function AsistenciaPage() {
  const initialData = await getAttendanceDataForToday();

  return (
    <div className="p-4 sm:p-6 md:p-8">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Registro de Asistencia</CardTitle>
          <CardDescription>
            Seleccione una fecha y marque la asistencia de los estudiantes en sus rotaciones clínicas.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <AsistenciaDataTable columns={columns} data={initialData} />
        </CardContent>
      </Card>
    </div>
  );
}