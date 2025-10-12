export type Solicitud = {
  id: number;
  carrera: string;
  añoFormacion: string;
  tipoPractica: string;
  servicioClinico: string;
  numeroCupos: number;
  tipoJornada: string;
  numeroAlumnos: number;
  asignatura: string | null;
  fechaInicio: string;
  fechaTermino: string;
  institucion: "INACAP" | "AIEP" | "Santo Tomás";
  status: "Pendiente" | "Aprobada" | "Rechazada";
  observacion?: string;
};

export const data: Solicitud[] = [
  {
    id: 1,
    carrera: "Tens",
    añoFormacion: "4º Semestre",
    tipoPractica: "Curricular",
    servicioClinico: "Medicina",
    numeroCupos: 8,
    tipoJornada: "Diurna",
    numeroAlumnos: 8,
    asignatura: null,
    fechaInicio: "03/03/2025",
    fechaTermino: "12/04/2025",
    institucion: "INACAP",
    status: "Pendiente",
  },
  {
    id: 2,
    carrera: "Tens",
    añoFormacion: "5º Semestre",
    tipoPractica: "Profesional",
    servicioClinico: "Medicina",
    numeroCupos: 4,
    tipoJornada: "4 Turno",
    numeroAlumnos: 16,
    asignatura: null,
    fechaInicio: "03/03/2025",
    fechaTermino: "12/04/2025",
    institucion: "INACAP",
    status: "Aprobada",
  },
  {
    id: 3,
    carrera: "Tens",
    añoFormacion: "4º Semestre",
    tipoPractica: "Curricular",
    servicioClinico: "Cirugía",
    numeroCupos: 8,
    tipoJornada: "Diurna",
    numeroAlumnos: 8,
    asignatura: null,
    fechaInicio: "03/03/2025",
    fechaTermino: "12/04/2025",
    institucion: "INACAP",
    status: "Rechazada",
    observacion: "Se rechaza la solicitud por falta de cupos disponibles en el servicio de Cirugía para las fechas solicitadas. Favor intentar en un periodo posterior."
  },
];