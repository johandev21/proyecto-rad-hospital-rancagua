export type Rotacion = {
  id: string;
  alumno: {
    nombre: string;
    institucion: string;
  };
  servicioClinico: string;
  tutor: string;
  docenteSupervisor: string;
  fechaInicio: string;
  fechaTermino:string;
  estado: "Programada" | "En Curso" | "Finalizada";
};

export const data: Rotacion[] = [
  {
    id: "ROT-001",
    alumno: { nombre: "Karla Estrella Labbé", institucion: "INACAP" },
    servicioClinico: "Medicina",
    tutor: "Dr. Ricardo Soto",
    docenteSupervisor: "Ana María López",
    fechaInicio: "2025-10-01",
    fechaTermino: "2025-11-15",
    estado: "En Curso",
  },
  {
    id: "ROT-002",
    alumno: { nombre: "Alexis Andrés Burgos", institucion: "UOH" },
    servicioClinico: "Cirugía",
    tutor: "Dra. Laura Ponce",
    docenteSupervisor: "Carlos Pérez",
    fechaInicio: "2025-10-05",
    fechaTermino: "2025-11-20",
    estado: "Programada",
  },
  {
    id: "ROT-003",
    alumno: { nombre: "Lucas Nicolás Carroza", institucion: "AIEP" },
    servicioClinico: "Pediatría",
    tutor: "Dr. Manuel Rojas",
    docenteSupervisor: "Isabel Torres",
    fechaInicio: "2025-09-01",
    fechaTermino: "2025-09-30",
    estado: "Finalizada",
  },
    {
    id: "ROT-004",
    alumno: { nombre: "María Ignacia Duarte", institucion: "INACAP" },
    servicioClinico: "Urgencias",
    tutor: "Dra. Carolina Vera",
    docenteSupervisor: "Ana María López",
    fechaInicio: "2025-10-10",
    fechaTermino: "2025-11-25",
    estado: "Programada",
  },
];