export type Asistencia = {
  id: string;
  alumno: {
    nombre: string;
    institucion: string;
  };
  servicioClinico: string;
  tutor: string;
  estado: "Pendiente" | "Presente" | "Ausente" | "Justificado";
};

export const data: Asistencia[] = [
  {
    id: "ROT-001-2025-10-01",
    alumno: { nombre: "Karla Estrella Labbé", institucion: "INACAP" },
    servicioClinico: "Medicina",
    tutor: "Dr. Ricardo Soto",
    estado: "Pendiente",
  },
  {
    id: "ROT-005-2025-10-01",
    alumno: { nombre: "Sofía Ester Gallardo", institucion: "AIEP" },
    servicioClinico: "Medicina",
    tutor: "Dr. Ricardo Soto",
    estado: "Pendiente",
  },
  {
    id: "ROT-002-2025-10-01",
    alumno: { nombre: "Alexis Andrés Burgos", institucion: "UOH" },
    servicioClinico: "Cirugía",
    tutor: "Dra. Laura Ponce",
    estado: "Pendiente",
  },
  {
    id: "ROT-004-2025-10-01",
    alumno: { nombre: "María Ignacia Duarte", institucion: "INACAP" },
    servicioClinico: "Urgencias",
    tutor: "Dra. Carolina Vera",
    estado: "Pendiente",
  },
  {
    id: "ROT-006-2025-10-01",
    alumno: { nombre: "Felipe Andrés Rojas", institucion: "UOH" },
    servicioClinico: "Pediatría",
    tutor: "Dr. Juan Pérez",
    estado: "Presente",
  },
  {
    id: "ROT-007-2025-10-01",
    alumno: { nombre: "Camila Fernanda Torres", institucion: "AIEP" },
    servicioClinico: "Ginecología",
    tutor: "Dra. Laura Ponce",
    estado: "Ausente",
  },
  {
    id: "ROT-001-2025-10-01",
    alumno: { nombre: "Karla Estrella Labbé", institucion: "INACAP" },
    servicioClinico: "Medicina",
    tutor: "Dr. Ricardo Soto",
    estado: "Pendiente",
  },
  {
    id: "ROT-005-2025-10-01",
    alumno: { nombre: "Sofía Ester Gallardo", institucion: "AIEP" },
    servicioClinico: "Medicina",
    tutor: "Dr. Ricardo Soto",
    estado: "Pendiente",
  },
  {
    id: "ROT-002-2025-10-01",
    alumno: { nombre: "Alexis Andrés Burgos", institucion: "UOH" },
    servicioClinico: "Cirugía",
    tutor: "Dra. Laura Ponce",
    estado: "Pendiente",
  },
  {
    id: "ROT-004-2025-10-01",
    alumno: { nombre: "María Ignacia Duarte", institucion: "INACAP" },
    servicioClinico: "Urgencias",
    tutor: "Dra. Carolina Vera",
    estado: "Pendiente",
  },
  {
    id: "ROT-006-2025-10-01",
    alumno: { nombre: "Felipe Andrés Rojas", institucion: "UOH" },
    servicioClinico: "Pediatría",
    tutor: "Dr. Juan Pérez",
    estado: "Presente",
  },
  {
    id: "ROT-007-2025-10-01",
    alumno: { nombre: "Camila Fernanda Torres", institucion: "AIEP" },
    servicioClinico: "Ginecología",
    tutor: "Dra. Laura Ponce",
    estado: "Ausente",
  },
  {
    id: "ROT-001-2025-10-01",
    alumno: { nombre: "Karla Estrella Labbé", institucion: "INACAP" },
    servicioClinico: "Medicina",
    tutor: "Dr. Ricardo Soto",
    estado: "Pendiente",
  },
  {
    id: "ROT-005-2025-10-01",
    alumno: { nombre: "Sofía Ester Gallardo", institucion: "AIEP" },
    servicioClinico: "Medicina",
    tutor: "Dr. Ricardo Soto",
    estado: "Pendiente",
  },
  {
    id: "ROT-002-2025-10-01",
    alumno: { nombre: "Alexis Andrés Burgos", institucion: "UOH" },
    servicioClinico: "Cirugía",
    tutor: "Dra. Laura Ponce",
    estado: "Pendiente",
  },
  {
    id: "ROT-004-2025-10-01",
    alumno: { nombre: "María Ignacia Duarte", institucion: "INACAP" },
    servicioClinico: "Urgencias",
    tutor: "Dra. Carolina Vera",
    estado: "Pendiente",
  },
  {
    id: "ROT-006-2025-10-01",
    alumno: { nombre: "Felipe Andrés Rojas", institucion: "UOH" },
    servicioClinico: "Pediatría",
    tutor: "Dr. Juan Pérez",
    estado: "Presente",
  },
  {
    id: "ROT-007-2025-10-01",
    alumno: { nombre: "Camila Fernanda Torres", institucion: "AIEP" },
    servicioClinico: "Ginecología",
    tutor: "Dra. Laura Ponce",
    estado: "Ausente",
  },
  {
    id: "ROT-001-2025-10-01",
    alumno: { nombre: "Karla Estrella Labbé", institucion: "INACAP" },
    servicioClinico: "Medicina",
    tutor: "Dr. Ricardo Soto",
    estado: "Pendiente",
  },
  {
    id: "ROT-005-2025-10-01",
    alumno: { nombre: "Sofía Ester Gallardo", institucion: "AIEP" },
    servicioClinico: "Medicina",
    tutor: "Dr. Ricardo Soto",
    estado: "Pendiente",
  },
  {
    id: "ROT-002-2025-10-01",
    alumno: { nombre: "Alexis Andrés Burgos", institucion: "UOH" },
    servicioClinico: "Cirugía",
    tutor: "Dra. Laura Ponce",
    estado: "Pendiente",
  },
  {
    id: "ROT-004-2025-10-01",
    alumno: { nombre: "María Ignacia Duarte", institucion: "INACAP" },
    servicioClinico: "Urgencias",
    tutor: "Dra. Carolina Vera",
    estado: "Pendiente",
  },
  {
    id: "ROT-006-2025-10-01",
    alumno: { nombre: "Felipe Andrés Rojas", institucion: "UOH" },
    servicioClinico: "Pediatría",
    tutor: "Dr. Juan Pérez",
    estado: "Presente",
  },
  {
    id: "ROT-007-2025-10-01",
    alumno: { nombre: "Camila Fernanda Torres", institucion: "AIEP" },
    servicioClinico: "Ginecología",
    tutor: "Dra. Laura Ponce",
    estado: "Ausente",
  },
  {
    id: "ROT-001-2025-10-01",
    alumno: { nombre: "Karla Estrella Labbé", institucion: "INACAP" },
    servicioClinico: "Medicina",
    tutor: "Dr. Ricardo Soto",
    estado: "Pendiente",
  },
  {
    id: "ROT-005-2025-10-01",
    alumno: { nombre: "Sofía Ester Gallardo", institucion: "AIEP" },
    servicioClinico: "Medicina",
    tutor: "Dr. Ricardo Soto",
    estado: "Pendiente",
  },
  {
    id: "ROT-002-2025-10-01",
    alumno: { nombre: "Alexis Andrés Burgos", institucion: "UOH" },
    servicioClinico: "Cirugía",
    tutor: "Dra. Laura Ponce",
    estado: "Pendiente",
  },
  {
    id: "ROT-004-2025-10-01",
    alumno: { nombre: "María Ignacia Duarte", institucion: "INACAP" },
    servicioClinico: "Urgencias",
    tutor: "Dra. Carolina Vera",
    estado: "Pendiente",
  },
  {
    id: "ROT-006-2025-10-01",
    alumno: { nombre: "Felipe Andrés Rojas", institucion: "UOH" },
    servicioClinico: "Pediatría",
    tutor: "Dr. Juan Pérez",
    estado: "Presente",
  },
  {
    id: "ROT-007-2025-10-01",
    alumno: { nombre: "Camila Fernanda Torres", institucion: "AIEP" },
    servicioClinico: "Ginecología",
    tutor: "Dra. Laura Ponce",
    estado: "Ausente",
  },
];

export type AsistenciaHistorial = {
  date: Date;
  estado: "Presente" | "Ausente" | "Justificado";
};

export const historyData: { [key: string]: AsistenciaHistorial[] } = {
  "ROT-001-2025-10-01": [
    { date: new Date("2025-09-15"), estado: "Presente" },
    { date: new Date("2025-09-16"), estado: "Presente" },
    { date: new Date("2025-09-17"), estado: "Ausente" },
    { date: new Date("2025-09-18"), estado: "Presente" },
    { date: new Date("2025-09-19"), estado: "Justificado" },
    { date: new Date("2025-09-22"), estado: "Presente" },
  ],
};
