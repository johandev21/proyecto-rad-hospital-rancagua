import { columns } from "./columns";
import { data } from "./data";
import { RotacionesDataTable } from "./data-table";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export function ViewRAD() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl md:text-2xl font-bold">Programación de Rotaciones</CardTitle>
        <CardDescription>
          Gestiona, asigna y visualiza todas las rotaciones de estudiantes en los servicios clínicos.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <RotacionesDataTable columns={columns} data={data} />
      </CardContent>
    </Card>
  );
}