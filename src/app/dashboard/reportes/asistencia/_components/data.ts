export type AsistenciaReporte = {
  id: string;
  fecha: string;
  alumno: {
    nombre: string;
    institucion: string;
  };
  servicioClinico: string;
  estado: "Presente" | "Ausente" | "Justificado";
};

export const reportData: AsistenciaReporte[] = [
  { id: "ASIS-001", fecha: "2025-09-15", alumno: { nombre: "Karla Labbé", institucion: "INACAP" }, servicioClinico: "Medicina", estado: "Presente" },
  { id: "ASIS-002", fecha: "2025-09-15", alumno: { nombre: "Alexis Burgos", institucion: "UOH" }, servicioClinico: "Cirugía", estado: "Presente" },
  { id: "ASIS-003", fecha: "2025-09-16", alumno: { nombre: "Karla Labbé", institucion: "INACAP" }, servicioClinico: "Medicina", estado: "Presente" },
  { id: "ASIS-004", fecha: "2025-09-17", alumno: { nombre: "Karla Labbé", institucion: "INACAP" }, servicioClinico: "Medicina", estado: "Ausente" },
];