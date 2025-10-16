import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { NotificacionesDataTable } from "./_components/data-table";
import { columns } from "./_components/columns";
import { data } from "./_components/data";

export default function NotificacionesPage() {
  return (
    <div className="p-4 sm:p-6 md:p-8">
      <Card>
        <CardHeader>
          <CardTitle className="text-xl md:text-2xl font-bold">
            Centro de Notificaciones
          </CardTitle>
          <CardDescription>
            Revisa y gestiona todas las alertas y actualizaciones del sistema.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <NotificacionesDataTable columns={columns} data={data} />
        </CardContent>
      </Card>
    </div>
  );
}