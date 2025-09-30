export const roles = [
  "Administrador",
  "Docente",
  "Tutor",
  "Estudiante",
] as const;
export const estados = ["Activo", "Inactivo"] as const;

export type UserRole = (typeof roles)[number];
export type UserStatus = (typeof estados)[number];

export type Usuario = {
  id: string;
  nombre: string;
  correo: string;
  rol: UserRole;
  estado: UserStatus;
  fechaCreacion: string;
};

export const data: Usuario[] = [
  {
    id: "USR-001",
    nombre: "Camilo Rojas Figueroa",
    correo: "camilo.rojas@uoh.cl",
    rol: "Administrador",
    estado: "Activo",
    fechaCreacion: "2024-01-15",
  },
  {
    id: "USR-002",
    nombre: "Banjamin Gonzales",
    correo: "benjamin.gonzales@uoh.cl",
    rol: "Docente",
    estado: "Activo",
    fechaCreacion: "2024-02-20",
  },
  {
    id: "USR-003",
    nombre: "Ana María López",
    correo: "ana.lopez@inacap.cl",
    rol: "Tutor",
    estado: "Activo",
    fechaCreacion: "2024-03-10",
  },
  {
    id: "USR-004",
    nombre: "Ricardo Soto",
    correo: "ricardo.soto@hospital.cl",
    rol: "Tutor",
    estado: "Inactivo",
    fechaCreacion: "2024-03-11",
  },
  {
    id: "USR-005",
    nombre: "Karla Labbé",
    correo: "karla.labbe@email.com",
    rol: "Estudiante",
    estado: "Activo",
    fechaCreacion: "2024-08-01",
  },
];
