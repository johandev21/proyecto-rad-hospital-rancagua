import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { AlumnosDataTable } from "./_components/data-table";
import { columns } from "./_components/columns";
import { data } from "./_components/data";

export default function RegistroAlumnosPage() {
  return (
    <div className="p-4 sm:p-6 md:p-8">
      <Card className="bg-card/80">
        <CardHeader>
          <CardTitle className="text-xl md:text-2xl font-bold">Registro de Alumnos</CardTitle>
          <CardDescription>
            Busca, filtra y gestiona el registro de todos los alumnos.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <AlumnosDataTable columns={columns} data={data} />
        </CardContent>
      </Card>
    </div>
  );
}