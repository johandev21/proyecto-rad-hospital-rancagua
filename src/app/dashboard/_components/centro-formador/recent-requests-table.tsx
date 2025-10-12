import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { recentRequestsData } from "./data/centro-formador-data";

export function RecentRequestsTable() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Estado de Solicitudes Recientes</CardTitle>
        <CardDescription>
          Un resumen de tus últimas gestiones de cupos.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID Solicitud</TableHead>
              <TableHead>Servicio</TableHead>
              <TableHead>Fecha</TableHead>
              <TableHead className="text-right">Estado</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {recentRequestsData.map((req) => (
              <TableRow key={req.id}>
                <TableCell className="font-medium">{req.id}</TableCell>
                <TableCell>{req.servicio}</TableCell>
                <TableCell>{req.fecha}</TableCell>
                <TableCell className="text-right">
                  <Badge
                    variant={
                      req.estado === "Rechazada" ? "destructive" : "secondary"
                    }
                    className={cn(
                      req.estado === "Aprobada" && "bg-green-100 text-green-800"
                    )}
                  >
                    {req.estado}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
