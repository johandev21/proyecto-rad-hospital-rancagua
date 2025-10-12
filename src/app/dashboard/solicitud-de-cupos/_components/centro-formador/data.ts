export type Solicitud = {
  id: string;
  servicioClinico: string;
  carrera: string;
  añoFormacion: string;
  tipoPractica: "Curricular" | "Profesional";
  numeroCupos: number;
  fechaInicio: string;
  fechaTermino: string;
  status: "Pendiente" | "Aprobada" | "Rechazada";
  observacion?: string; 
};

export const data: Solicitud[] = [
  {
    id: "SOL-INACAP-001",
    servicioClinico: "Pediatría",
    carrera: "Tens",
    añoFormacion: "4º Semestre",
    tipoPractica: "Curricular",
    numeroCupos: 10,
    fechaInicio: "2025-08-01",
    fechaTermino: "2025-09-15",
    status: "Aprobada",
  },
  {
    id: "SOL-INACAP-002",
    servicioClinico: "Cirugía",
    carrera: "Tens",
    añoFormacion: "5º Semestre",
    tipoPractica: "Profesional",
    numeroCupos: 5,
    fechaInicio: "2025-09-01",
    fechaTermino: "2025-10-15",
    status: "Rechazada",
    observacion: "Capacidad máxima del servicio excedida para las fechas solicitadas. Se sugiere reducir el número de cupos o proponer un período alternativo."
  },
  {
    id: "SOL-INACAP-003",
    servicioClinico: "Medicina Interna",
    carrera: "Enfermería",
    añoFormacion: "3er Año",
    tipoPractica: "Curricular",
    numeroCupos: 12,
    fechaInicio: "2025-10-01",
    fechaTermino: "2025-11-15",
    status: "Pendiente",
  },
    {
    id: "SOL-INACAP-004",
    servicioClinico: "Urgencias",
    carrera: "Tens",
    añoFormacion: "5º Semestre",
    tipoPractica: "Profesional",
    numeroCupos: 8,
    fechaInicio: "2025-11-01",
    fechaTermino: "2025-12-15",
    status: "Pendiente",
  },
];