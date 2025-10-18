"use client";

import * as React from "react";
import { StatCard } from "./_components/stat-card";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  Users,
  CalendarCheck,
  CalendarClock,
  ArrowRight,
  BookUser,
  CalendarDays,
} from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { addDays, parse, isWithinInterval, startOfDay } from "date-fns";

const dashboardData = {
  nombreServicio: "Medicina",
  rotacionesActivasHoy: 1,
  alumnosPresentesHoy: 8,
  capacidadMaximaServicio: 15,
  proximasRotaciones7Dias: 2,
};

const proximasRotacionesData = [
  {
    id: "ROT-001",
    carrera: "Enfermería",
    tipoPractica: "Internado",
    fechaInicio: "20/10/2025",
    numeroAlumnos: 5,
  },
  {
    id: "ROT-002",
    carrera: "Tecnología Médica",
    tipoPractica: "Curricular",
    fechaInicio: "22/10/2025",
    numeroAlumnos: 3,
  },
  {
    id: "ROT-003",
    carrera: "Medicina",
    tipoPractica: "Internado",
    fechaInicio: "27/10/2025",
    numeroAlumnos: 6,
  },
  {
    id: "ROT-004",
    carrera: "Tens",
    tipoPractica: "Profesional",
    fechaInicio: "10/11/2025",
    numeroAlumnos: 4,
  },
];

export default function JefeServicioDashboardPage() {
  const [filterDays, setFilterDays] = React.useState<number>(7);

  const today = startOfDay(new Date(2025, 9, 18));
  const filterEndDate = addDays(today, filterDays);

  const filteredRotaciones = proximasRotacionesData.filter((rotacion) => {
    try {
      const startDate = parse(rotacion.fechaInicio, "dd/MM/yyyy", today);
      return isWithinInterval(startDate, { start: today, end: filterEndDate });
    } catch (e) {
      console.error("Error parsing date:", rotacion.fechaInicio, e);
      return false;
    }
  });

  return (
    <div className="p-4 sm:p-6 md:p-8 space-y-8 min-h-screen">
      {/* Cabecera de Bienvenida */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-foreground">
            Dashboard de Servicio
          </h1>
          <p className="text-lg text-muted-foreground">
            Servicio de {dashboardData.nombreServicio}
          </p>
        </div>
        <p className="text-sm text-muted-foreground">
          Bienvenido, Jefe de Servicio.
        </p>
      </div>

      {/* Tarjetas de Estadísticas */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <StatCard
          title="Rotaciones Activas Hoy"
          value={dashboardData.rotacionesActivasHoy}
          icon={CalendarCheck}
          description="Grupos rotando actualmente"
        />
        <StatCard
          title="Alumnos Presentes Hoy"
          value={dashboardData.alumnosPresentesHoy}
          icon={Users}
          description="Total / Capacidad estimada"
          maxValue={dashboardData.capacidadMaximaServicio}
        />
        <StatCard
          title={`Próximas Rotaciones (${filterDays} días)`}
          value={filteredRotaciones.length}
          icon={CalendarClock}
          description="Grupos por iniciar próximamente"
        />
      </div>

      {/* Sección de Acceso Rápido */}
      <Card className="bg-gradient-to-r from-primary/10 to-transparent border-primary/20">
        <CardHeader>
          <CardTitle>Horario Detallado</CardTitle>
          <CardDescription>
            Consulta el calendario completo de rotaciones programadas para tu
            servicio y los alumnos asignados.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button asChild>
            <Link href="/jefe-servicio/dashboard/rotaciones">
              Ver Horario de Rotaciones <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </CardContent>
      </Card>

      {/* Sección Próximas Rotaciones */}
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <CardTitle>Rotaciones Iniciando Próximamente</CardTitle>
              <CardDescription>
                Resumen de los grupos que comenzarán en el período seleccionado.
              </CardDescription>
            </div>
            {/* Quick Filter Toggle */}
            <ToggleGroup
              type="single"
              defaultValue="7"
              variant="outline"
              size="sm"
              onValueChange={(value) => setFilterDays(Number(value))}
            >
              <ToggleGroupItem value="7" aria-label="Próximos 7 días">
                7 Días
              </ToggleGroupItem>
              <ToggleGroupItem value="30" aria-label="Próximos 30 días">
                30 Días
              </ToggleGroupItem>
            </ToggleGroup>
          </div>
        </CardHeader>
        <CardContent>
          {filteredRotaciones.length > 0 ? (
            <div className="space-y-1">
              {filteredRotaciones.map((rotacion, index) => (
                <React.Fragment key={rotacion.id}>
                  {index > 0 && <Separator />}
                  <Link
                    href={`/jefe-servicio/dashboard/rotaciones?rotacionId=${rotacion.id}`}
                    className="block hover:bg-muted/50 rounded-lg transition-colors"
                  >
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-x-4 gap-y-2 py-3 px-2 items-center">
                      <div className="flex items-center gap-3">
                        <BookUser className="h-6 w-6 text-muted-foreground flex-shrink-0" />
                        <div>
                          <p className="font-semibold">{rotacion.carrera}</p>
                          <p className="text-sm text-muted-foreground">
                            {rotacion.tipoPractica}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <CalendarDays className="h-4 w-4 text-muted-foreground" />
                        <span className="text-muted-foreground">Inicia:</span>
                        <span className="font-medium text-foreground">
                          {rotacion.fechaInicio}
                        </span>
                      </div>
                      <div className="flex justify-start sm:justify-end">
                        <Badge
                          variant="secondary"
                          className="flex items-center gap-2 w-fit"
                        >
                          <Users className="h-3 w-3" />
                          {rotacion.numeroAlumnos} Alumnos
                        </Badge>
                      </div>
                    </div>
                  </Link>
                </React.Fragment>
              ))}
            </div>
          ) : (
            <p className="text-sm text-muted-foreground text-center py-4">
              No hay rotaciones programadas para iniciar en los próximos{" "}
              {filterDays} días.
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
