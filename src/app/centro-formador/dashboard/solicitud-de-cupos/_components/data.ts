export type SolicitudCentroFormador = {
  id: number;
  carrera: string;
  añoFormacion: string;
  tipoPractica: "Curricular" | "Profesional" | "Internado";
  servicioClinico: string;
  numeroCupos: number;
  tipoJornada: "Diurna" | "4 Turno";
  numeroAlumnos: number;
  asignatura: string | null;
  fechaInicio: string;
  fechaTermino: string;
  status: "Pendiente" | "Aprobada" | "Rechazada";
  observacion?: string;
};

// Datos de ejemplo para simular las solicitudes de un centro formador
export const data: SolicitudCentroFormador[] = [
  {
    id: 1,
    carrera: "Tens",
    añoFormacion: "4º Semestre",
    tipoPractica: "Curricular",
    servicioClinico: "Medicina",
    numeroCupos: 8,
    tipoJornada: "Diurna",
    numeroAlumnos: 8,
    asignatura: "Introducción a la Clínica",
    fechaInicio: "03/03/2025",
    fechaTermino: "12/04/2025",
    status: "Aprobada",
  },
  {
    id: 2,
    carrera: "Enfermería",
    añoFormacion: "8º Semestre",
    tipoPractica: "Internado",
    servicioClinico: "Urgencias",
    numeroCupos: 5,
    tipoJornada: "4 Turno",
    numeroAlumnos: 5,
    asignatura: "Internado Rotativo",
    fechaInicio: "15/05/2025",
    fechaTermino: "28/06/2025",
    status: "Pendiente",
  },
  {
    id: 3,
    carrera: "Tens",
    añoFormacion: "5º Semestre",
    tipoPractica: "Profesional",
    servicioClinico: "Cirugía",
    numeroCupos: 4,
    tipoJornada: "4 Turno",
    numeroAlumnos: 16,
    asignatura: "Práctica Profesional",
    fechaInicio: "03/03/2025",
    fechaTermino: "12/04/2025",
    status: "Rechazada",
    observacion: "Se rechaza la solicitud por falta de cupos disponibles en el servicio de Cirugía para las fechas solicitadas. Favor intentar en un periodo posterior."
  },
  {
    id: 4,
    carrera: "Kinesiología",
    añoFormacion: "6º Semestre",
    tipoPractica: "Curricular",
    servicioClinico: "Traumatología",
    numeroCupos: 6,
    tipoJornada: "Diurna",
    numeroAlumnos: 6,
    asignatura: "Kine en Trauma",
    fechaInicio: "20/07/2025",
    fechaTermino: "30/08/2025",
    status: "Pendiente",
  },
];