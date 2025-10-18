export const roles = [
  "Administrador RAD",
  "Coordinador CF",
  "Encargado SC",
] as const;

export const estados = ["Activo", "Inactivo"] as const;

export type UserRole = (typeof roles)[number];
export type UserStatus = (typeof estados)[number];

export type Usuario = {
  id: string;
  nombre: string;
  correo: string;
  rol: UserRole;
  entidadAsociada: string | null;
  estado: UserStatus;
  fechaCreacion: string;
};

export const data: Usuario[] = [
  {
    id: "USR-RAD-001",
    nombre: "Admin Principal RAD",
    correo: "admin.rad@hospital.cl",
    rol: "Administrador RAD",
    entidadAsociada: null,
    estado: "Activo",
    fechaCreacion: "2024-01-15",
  },
  {
    id: "USR-CF-001",
    nombre: "Coordinador Inacap",
    correo: "coord.inacap@inacap.cl",
    rol: "Coordinador CF",
    entidadAsociada: "Inacap",
    estado: "Activo",
    fechaCreacion: "2024-02-20",
  },
  {
    id: "USR-SC-001",
    nombre: "Jefe Servicio Medicina",
    correo: "jefe.medicina@hospital.cl",
    rol: "Encargado SC",
    entidadAsociada: "Medicina",
    estado: "Activo",
    fechaCreacion: "2024-03-10",
  },
  {
    id: "USR-CF-002",
    nombre: "Coordinadora UOH",
    correo: "coord.practicas@uoh.cl",
    rol: "Coordinador CF",
    entidadAsociada: "Universidad de O’Higgins",
    estado: "Activo",
    fechaCreacion: "2024-05-01",
  },
  {
    id: "USR-SC-002",
    nombre: "Encargada Cirugía",
    correo: "enc.cirugia@hospital.cl",
    rol: "Encargado SC",
    entidadAsociada: "Cirugía",
    estado: "Inactivo",
    fechaCreacion: "2024-06-15",
  },
  {
    id: "USR-CF-003",
    nombre: "Contacto U. San Sebastián",
    correo: "contacto.uss@uss.cl",
    rol: "Coordinador CF",
    entidadAsociada: "Universidad San Sebastián",
    estado: "Activo",
    fechaCreacion: "2024-07-22",
  },
];
