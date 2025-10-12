import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import Link from "next/link";

const recentRotations = [
    { name: "Karla Labbé", service: "Medicina", startDate: "2025-10-01" },
    { name: "Alexis Burgos", service: "Cirugía", startDate: "2025-10-02" },
    { name: "Lucas Carroza", service: "Pediatría", startDate: "2025-10-03" },
    { name: "María Duarte", service: "Urgencias", startDate: "2025-10-05" },
];

export function RotacionesRecientes() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Próximas Rotaciones</CardTitle>
        <CardDescription>Estas son las próximas rotaciones programadas para iniciar.</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Alumno</TableHead>
                    <TableHead>Servicio</TableHead>
                    <TableHead>Fecha de Inicio</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {recentRotations.map((rotation) => (
                    <TableRow key={rotation.name}>
                        <TableCell>
                            <div className="flex items-center gap-2">
                                <Avatar className="h-8 w-8">
                                    <AvatarFallback>{rotation.name.charAt(0)}</AvatarFallback>
                                </Avatar>
                                <span className="font-medium">{rotation.name}</span>
                            </div>
                        </TableCell>
                        <TableCell>{rotation.service}</TableCell>
                        <TableCell>{rotation.startDate}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
        <div className="mt-4 text-center">
             <Link href="/dashboard/programacion" className="text-sm font-medium text-primary hover:underline">
                Ver toda la programación
            </Link>
        </div>
      </CardContent>
    </Card>
  );
}