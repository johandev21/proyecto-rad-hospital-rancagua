import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Users,
  ClipboardList,
  CheckCircle2,
  CalendarClock,
  ArrowRight,
  Bell,
  UserPlus,
  ClipboardCheck,
  ClipboardX,
} from "lucide-react";

const stats = {
  totalAlumnos: 50,
  solicitudesPendientes: 2,
  cuposAprobados: 3,
  rotacionesActivas: 1,
};

const actividadReciente = [
  {
    icon: ClipboardCheck,
    color: "text-green-500",
    text: "Tu solicitud para Kinesiología en Traumatología ha sido APROBADA.",
    time: "hace 15 minutos",
  },
  {
    icon: ClipboardX,
    color: "text-red-500",
    text: "Tu solicitud para Tens en Cirugía ha sido RECHAZADA.",
    time: "hace 1 hora",
  },
  {
    icon: UserPlus,
    color: "text-blue-500",
    text: "Has añadido 12 nuevos alumnos a la nómina general.",
    time: "hace 5 horas",
  },
  {
    icon: Bell,
    color: "text-yellow-500",
    text: "La rotación en Medicina está a una semana de comenzar.",
    time: "ayer",
  },
];

const proximasRotaciones = [
    {
        servicio: "Medicina",
        carrera: "Tens",
        fechaInicio: "03/03/2025",
        alumnos: 8
    },
    {
        servicio: "Pediatría",
        carrera: "Enfermería",
        fechaInicio: "26/05/2025",
        alumnos: 5
    },
    {
        servicio: "Traumatología",
        carrera: "Kinesiología",
        fechaInicio: "07/07/2025",
        alumnos: 6
    },
];


export default function DashboardCentroFormador() {
  return (
    <div className="p-4 sm:p-6 md:p-8 space-y-8 min-h-screen">
      
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          Dashboard Centro Formador
        </h1>
        <p className="text-muted-foreground">Bienvenido, INACAP</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard title="Total de Alumnos" value={stats.totalAlumnos} icon={Users} />
        <StatCard title="Solicitudes Pendientes" value={stats.solicitudesPendientes} icon={ClipboardList} />
        <StatCard title="Cupos Aprobados" value={stats.cuposAprobados} icon={CheckCircle2} />
        <StatCard title="Rotaciones Activas" value={stats.rotacionesActivas} icon={CalendarClock} />
      </div>

      <div className="grid gap-8 lg:grid-cols-3 lg:gap-8">
        
        <div className="lg:col-span-2 space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>Acciones Rápidas</CardTitle>
              <CardDescription>Accede a las funciones principales del sistema.</CardDescription>
            </CardHeader>
            <CardContent className="grid sm:grid-cols-2 gap-4">
              <ActionCard 
                title="Gestionar Nómina de Alumnos" 
                description="Añade, edita o elimina alumnos de tu institución."
                href="/centro-formador/dashboard/gestion-de-alumnos"
              />
              <ActionCard 
                title="Solicitar Nuevos Cupos" 
                description="Crea y gestiona tus solicitudes de cupos para rotaciones."
                href="/centro-formador/dashboard/solicitud-de-cupos"
              />
              <ActionCard 
                title="Ver Nóminas Enviadas" 
                description="Consulta el historial de nóminas enviadas al RAD."
                href="/centro-formador/dashboard/nominas-enviadas"
                className="sm:col-span-2"
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Próximas Rotaciones</CardTitle>
              <CardDescription>Estas son las próximas rotaciones programadas para comenzar.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {proximasRotaciones.map((rotacion, index) => (
                   <div key={index} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                      <div>
                         <p className="font-semibold">{rotacion.servicio} <span className="font-normal text-muted-foreground">- {rotacion.carrera}</span></p>
                         <p className="text-sm text-muted-foreground">Inicia el {rotacion.fechaInicio}</p>
                      </div>
                      <Badge variant="secondary" className="flex items-center gap-2">
                         <Users className="h-3 w-3" />
                         {rotacion.alumnos} Alumnos
                      </Badge>
                   </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Actividad Reciente</CardTitle>
              <CardDescription>Últimas notificaciones y actualizaciones.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {actividadReciente.map((item, index) => (
                <div key={index} className="flex items-start gap-4">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted">
                     <item.icon className={`h-4 w-4 ${item.color}`} />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm">{item.text}</p>
                    <p className="text-xs text-muted-foreground">{item.time}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

function StatCard({ title, value, icon: Icon }: { title: string; value: number | string; icon: React.ElementType }) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <Icon className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
      </CardContent>
    </Card>
  );
}

function ActionCard({ title, description, href, className }: { title: string; description: string; href: string, className?: string }) {
  return (
    <div className={`p-4 bg-muted rounded-lg flex flex-col md:flex-row md:items-center md:justify-between gap-4 ${className}`}>
      <div className="space-y-1">
        <h4 className="font-semibold">{title}</h4>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
      <Button asChild size="sm" variant="outline" className="flex-shrink-0">
        <a href={href}>
          Ir <ArrowRight className="ml-2 h-4 w-4" />
        </a>
      </Button>
    </div>
  )
}