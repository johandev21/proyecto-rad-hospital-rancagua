import { LucideIcon } from "lucide-react";
import { BarChart3, CalendarCheck, CircleDollarSign, Users } from "lucide-react";

export type Reporte = {
  title: string;
  description: string;
  icon: LucideIcon;
  href: string;
};

export const availableReports: Reporte[] = [
  {
    title: "Reporte de Asistencia",
    description: "Genere un historial detallado de la asistencia de alumnos por rango de fechas, servicio o institución.",
    icon: CalendarCheck,
    href: "/dashboard/reportes/asistencia",
  },
  {
    title: "Reporte de Ocupación",
    description: "Visualice el uso y la disponibilidad de los servicios clínicos para optimizar la planificación.",
    icon: BarChart3,
    href: "/dashboard/reportes/ocupacion",
  },
  {
    title: "Reporte de Rotaciones",
    description: "Consulte todas las rotaciones programadas, filtrando por institución, carrera o estado.",
    icon: Users,
    href: "/dashboard/reportes/rotaciones",
  },
  {
    title: "Reporte de Retribuciones",
    description: "Exporte el desglose de las retribuciones económicas calculadas para un período específico.",
    icon: CircleDollarSign,
    href: "/dashboard/reportes/retribuciones",
  },
];