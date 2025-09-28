export type RotacionReporte = {
  id: string;
  alumno: {
    nombre: string;
    institucion: string;
  };
  carrera: string;
  servicioClinico: string;
  fechaInicio: string;
  fechaTermino: string;
  estado: "Programada" | "En Curso" | "Finalizada";
};

export const reportData: RotacionReporte[] = [
  { id: "ROT-001", alumno: { nombre: "Karla Labbé", institucion: "INACAP" }, carrera: "Tens", servicioClinico: "Medicina", fechaInicio: "2025-09-15", fechaTermino: "2025-10-15", estado: "Finalizada" },
  { id: "ROT-002", alumno: { nombre: "Alexis Burgos", institucion: "UOH" }, carrera: "Medicina", servicioClinico: "Cirugía", fechaInicio: "2025-09-20", fechaTermino: "2025-10-20", estado: "En Curso" },
  { id: "ROT-003", alumno: { nombre: "Lucas Carroza", institucion: "AIEP" }, carrera: "Enfermería", servicioClinico: "Pediatría", fechaInicio: "2025-10-01", fechaTermino: "2025-11-01", estado: "Programada" },
];