import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { columns } from "./_components/columns";
import { data } from "./_components/data";
import { RotacionesDataTable } from "./_components/data-table";

export default async function ProgramacionPage() {
  return (
    <div className="p-4 sm:p-6 md:p-8">
      <Card>
        <CardHeader>
          <CardTitle className="text-xl md:text-2xl font-bold">
            Programación de Rotaciones
          </CardTitle>
          <CardDescription>
            Gestiona, asigna y visualiza todas las rotaciones de estudiantes en
            los servicios clínicos.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <RotacionesDataTable columns={columns} data={data} />
        </CardContent>
      </Card>
    </div>
  );
}
