export type Notificacion = {
  id: string;
  titulo: string;
  descripcion: string;
  fecha: string; 
  leida: boolean;
  tipo: "Aprobacion" | "Rechazo" | "Informacion" | "Recordatorio";
  prioridad: "Alta" | "Media" | "Baja";
  enlace?: string; 
};

export const data: Notificacion[] = [
  {
    id: "NOTIF-001",
    titulo: "Solicitud de Cupos Aprobada",
    descripcion: "Tu solicitud para Kinesiología en Traumatología (ID: SOL-103) ha sido aprobada por el RAD.",
    fecha: "2025-10-16T14:30:00Z",
    leida: false,
    tipo: "Aprobacion",
    prioridad: "Media",
    enlace: "/centro-formador/solicitud-de-cupos",
  },
  {
    id: "NOTIF-002",
    titulo: "Solicitud de Cupos Rechazada",
    descripcion: "Tu solicitud para Tens en Cirugía (ID: SOL-102) fue rechazada. Revisa las observaciones.",
    fecha: "2025-10-16T11:15:00Z",
    leida: false,
    tipo: "Rechazo",
    prioridad: "Alta",
    enlace: "/centro-formador/solicitud-de-cupos",
  },
  {
    id: "NOTIF-003",
    titulo: "Nómina de Alumnos Recibida",
    descripcion: "El RAD ha recibido tu nómina de alumnos para la rotación en Medicina (ID: NOM-2025-001).",
    fecha: "2025-10-15T18:00:00Z",
    leida: true,
    tipo: "Informacion",
    prioridad: "Baja",
    enlace: "/centro-formador/nominas-enviadas",
  },
  {
    id: "NOTIF-004",
    titulo: "Recordatorio: Inicio de Rotación",
    descripcion: "La rotación de Tens en el servicio de Medicina comenzará en 7 días.",
    fecha: "2025-10-14T09:00:00Z",
    leida: true,
    tipo: "Recordatorio",
    prioridad: "Media",
    enlace: "/centro-formador/nominas-enviadas",
  },
  {
    id: "NOTIF-005",
    titulo: "Actualización de Capacidad Formadora",
    descripcion: "El servicio de Pediatría ha actualizado su capacidad formadora para el próximo semestre.",
    fecha: "2025-10-13T16:45:00Z",
    leida: true,
    tipo: "Informacion",
    prioridad: "Baja",
  },
  {
    id: "NOTIF-006",
    titulo: "Nómina Final Aprobada",
    descripcion: "La nómina para la rotación en UCI (ID: NOM-2025-004) ha sido aprobada final por el RAD.",
    fecha: "2025-10-16T16:05:00Z",
    leida: false,
    tipo: "Aprobacion",
    prioridad: "Alta",
    enlace: "/centro-formador/nominas-enviadas",
  },
];