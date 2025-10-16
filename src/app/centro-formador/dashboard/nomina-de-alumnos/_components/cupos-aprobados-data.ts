// Este archivo simula los datos de los cupos que el RAD ya ha aprobado.
// En una aplicación real, esto vendría de una llamada a la API.

export type CupoAprobado = {
  id: number;
  servicioClinico: string;
  carrera: string;
  tipoPractica: string;
  numeroCupos: number;
  fechaInicio: string;
  fechaTermino: string;
  tipoJornada: string;
};

export const cuposAprobadosData: CupoAprobado[] = [
  {
    id: 101,
    servicioClinico: "Medicina",
    carrera: "Tens",
    tipoPractica: "Curricular",
    numeroCupos: 8,
    fechaInicio: "03/03/2025",
    fechaTermino: "12/04/2025",
    tipoJornada: "Diurna",
  },
  {
    id: 102,
    servicioClinico: "Pediatría",
    carrera: "Enfermería",
    tipoPractica: "Internado",
    numeroCupos: 5,
    fechaInicio: "26/05/2025",
    fechaTermino: "05/07/2025",
    tipoJornada: "4 Turno",
  },
  {
    id: 103,
    servicioClinico: "Traumatología",
    carrera: "Kinesiología",
    tipoPractica: "Profesional",
    numeroCupos: 6,
    fechaInicio: "07/07/2025",
    fechaTermino: "16/08/2025",
    tipoJornada: "Diurna",
  },
    {
    id: 104,
    servicioClinico: "UCI",
    carrera: "Medicina",
    tipoPractica: "Internado",
    numeroCupos: 2,
    fechaInicio: "18/08/2025",
    fechaTermino: "27/09/2025",
    tipoJornada: "4 Turno",
  },
];