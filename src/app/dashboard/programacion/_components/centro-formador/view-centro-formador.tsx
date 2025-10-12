import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { RotationsList } from "./data-table";
import { columns } from "./columns";
import { data } from "./data";

export function ViewCentroFormador() {
  const rotationsData = data;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Consulta de Programación</CardTitle>
        <CardDescription>
          Visualice el cronograma y los detalles de las rotaciones de sus
          alumnos.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <RotationsList columns={columns} data={rotationsData} />
      </CardContent>
    </Card>
  );
}
