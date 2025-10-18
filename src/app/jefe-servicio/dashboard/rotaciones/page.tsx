import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { RotacionesDataTable } from "./_components/data-table";
import { columns } from "./_components/columns";
import { data, nombreServicio } from "./_components/data";

export default function RotacionesServicioPage() {
  return (
    <div className="p-4 sm:p-6 md:p-8">
      <Card>
        <CardHeader>
          <CardTitle className="text-xl md:text-2xl font-bold">
            Horario de Rotaciones - Servicio de {nombreServicio}
          </CardTitle>
          <CardDescription>
            Visualiza todas las rotaciones de estudiantes programadas, en curso y finalizadas en tu servicio. Expande cada fila para ver los alumnos asignados.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <RotacionesDataTable columns={columns} data={data} />
        </CardContent>
      </Card>
    </div>
  );
}