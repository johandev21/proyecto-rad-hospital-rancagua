export type AlumnoNomina = {
  nombre: string;
  rut: string;
  certificadoVacunasUrl?: string;
};

export type Nomina = {
  id: string;
  solicitudId: string;
  servicioClinico: string;
  cuposAprobados: number;
  alumnos: AlumnoNomina[];
  estado: "Pendiente de Revisión" | "Aprobada" | "Devuelta con Observaciones";
  docenteSupervisor?: string;
  notas?: string;
};

export const data: Nomina[] = [
  {
    id: "NOM-001",
    solicitudId: "SOL-INACAP-001",
    servicioClinico: "Pediatría",
    cuposAprobados: 10,
    alumnos: [
      { nombre: "Juan Pérez", rut: "11.111.111-1" },
      { nombre: "Ana López", rut: "22.222.222-2" },
    ],
    estado: "Aprobada",
    docenteSupervisor: "Ana María López",
    notas: "Grupo requiere acceso a sala de estudios los viernes.",
  },
  {
    id: "NOM-002",
    solicitudId: "SOL-INACAP-004",
    servicioClinico: "Urgencias",
    cuposAprobados: 8,
    alumnos: [{ nombre: "Carlos Soto", rut: "33.333.333-3" }],
    estado: "Devuelta con Observaciones",
  },
  {
    id: "NOM-003",
    solicitudId: "SOL-INACAP-005",
    servicioClinico: "Medicina",
    cuposAprobados: 12,
    alumnos: [],
    estado: "Pendiente de Revisión",
  },
];

export type SolicitudAprobada = {
  id: string;
  servicioClinico: string;
  cuposAprobados: number;
};

export const solicitudesAprobadasData: SolicitudAprobada[] = [
  { id: "SOL-INACAP-001", servicioClinico: "Pediatría", cuposAprobados: 10 },
  { id: "SOL-INACAP-008", servicioClinico: "Medicina", cuposAprobados: 12 },
  { id: "SOL-INACAP-012", servicioClinico: "Ginecología", cuposAprobados: 6 },
];
