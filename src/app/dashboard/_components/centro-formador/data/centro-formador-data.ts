import { AlertCircle, FilePlus, Users } from "lucide-react";

export const kpiData = [
  { title: "Solicitudes Pendientes", value: "4", icon: FilePlus, description: "Esperando respuesta del RAD" },
  { title: "Alumnos en Rotación", value: "18", icon: Users, description: "Actualmente en el hospital" },
  { title: "Acciones Requeridas", value: "2", icon: AlertCircle, description: "Solicitudes devueltas" },
];

export const tasksData = [
    { title: "Enviar Nómina para Pediatría", description: "Cupos aprobados para el 15/10/2025.", href: "/dashboard/nominas", status: "new" },
    { title: "Modificar Solicitud para Cirugía", description: "Devuelta con observaciones por el RAD.", href: "/dashboard/solicitud-de-cupos/123", status: "action_required" },
    { title: "Adjuntar certificados para Medicina", description: "Faltan 2 certificados de vacunas.", href: "/dashboard/nominas/456", status: "action_required" },
];

export const recentRequestsData = [
    { id: "SOL-2025-045", servicio: "Medicina", estado: "Aprobada", fecha: "2025-09-20" },
    { id: "SOL-2025-046", servicio: "Cirugía", estado: "Rechazada", fecha: "2025-09-19" },
    { id: "SOL-2025-047", servicio: "Pediatría", estado: "Pendiente", fecha: "2025-09-22" },
];