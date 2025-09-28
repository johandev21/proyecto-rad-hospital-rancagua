export const areas = [
  "Médico",
  "Quirúrgico",
  "Apoyo Diagnóstico",
  "Ambulatorio",
] as const;

export type ServiceArea = (typeof areas)[number];

export type ServicioClinico = {
  id: string;
  nombre: string;
  area: ServiceArea;
  capacidadPregrado: number;
  capacidadPostgrado: number;
  estado: "Activo" | "Inactivo";
};

export const data: ServicioClinico[] = [
  {
    id: "SRV-001",
    nombre: "Medicina Interna",
    area: "Médico",
    capacidadPregrado: 20,
    capacidadPostgrado: 5,
    estado: "Activo",
  },
  {
    id: "SRV-002",
    nombre: "Cirugía General",
    area: "Quirúrgico",
    capacidadPregrado: 15,
    capacidadPostgrado: 8,
    estado: "Activo",
  },
  {
    id: "SRV-003",
    nombre: "Pediatría",
    area: "Médico",
    capacidadPregrado: 18,
    capacidadPostgrado: 6,
    estado: "Activo",
  },
  {
    id: "SRV-004",
    nombre: "Laboratorio Clínico",
    area: "Apoyo Diagnóstico",
    capacidadPregrado: 10,
    capacidadPostgrado: 2,
    estado: "Inactivo",
  },
  {
    id: "SRV-005",
    nombre: "Consultorio Adosado",
    area: "Ambulatorio",
    capacidadPregrado: 25,
    capacidadPostgrado: 0,
    estado: "Activo",
  },
];
