import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { NominasEnviadasDataTable } from "./_components/data-table";
import { columns } from "./_components/columns";
import { data } from "./_components/data";

export default function NominasEnviadasPage() {
  return (
    <div className="p-4 sm:p-6 md:p-8">
      <Card>
        <CardHeader>
          <CardTitle className="text-xl md:text-2xl font-bold">
            Historial de Nóminas Enviadas
          </CardTitle>
          <CardDescription>
            Consulta el registro de todas las nóminas de rotación enviadas al RAD y los alumnos asignados a cada una.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <NominasEnviadasDataTable columns={columns} data={data} />
        </CardContent>
      </Card>
    </div>
  );
}