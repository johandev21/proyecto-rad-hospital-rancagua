import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CapacidadDataTable } from "./_components/data-table";
import { columns } from "./_components/columns";
import { data } from "./_components/data";

export default function CapacidadFormadoraPage() {
  return (
    <div className="p-4 sm:p-6 md:p-8">
      <Card className="bg-card/80">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">
            Capacidad Formadora
          </CardTitle>
          <CardDescription>
            Gestiona y visualiza los cupos disponibles por centro formador.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <CapacidadDataTable columns={columns} data={data} />
        </CardContent>
      </Card>
    </div>
  );
}
