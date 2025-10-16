import { Alumno } from "../../nomina-de-alumnos/_components/data";

export type NominaEnviada = {
  id: string; // Usamos un string para el ID de la nómina
  servicioClinico: string;
  carrera: string;
  fechaInicio: string;
  fechaTermino: string;
  numeroAlumnos: number;
  estadoRAD: "Recibida" | "En Revisión" | "Aprobada Final";
  alumnosAsignados: Alumno[];
};

export const data: NominaEnviada[] = [
  {
    id: "NOM-2025-001",
    servicioClinico: "Medicina",
    carrera: "Tens",
    fechaInicio: "03/03/2025",
    fechaTermino: "12/04/2025",
    numeroAlumnos: 2,
    estadoRAD: "Aprobada Final",
    alumnosAsignados: [
      {
        id: 1,
        nombre: "Karla Estrella",
        primerApellido: "Labbé",
        segundoApellido: "Zúñiga",
        rut: "20.963.728-6",
        correo: "karla.labbe@inacapmail.cl",
        telefono: "966 599 330",
        nombreEmergencia: "Susy Zúñiga",
        telefonoEmergencia: "989 022 154",
        institucion: "INACAP",
      },
      {
        id: 2,
        nombre: "Alexis Andrés",
        primerApellido: "Burgos",
        segundoApellido: "Rios",
        rut: "20.443.124-8",
        correo: "alexis.burgos@inacapmail.cl",
        telefono: "977 947 138",
        nombreEmergencia: "Rigoberto Burgos",
        telefonoEmergencia: "933 976 968",
        institucion: "INACAP",
      },
    ],
  },
  {
    id: "NOM-2025-002",
    servicioClinico: "Pediatría",
    carrera: "Enfermería",
    fechaInicio: "26/05/2025",
    fechaTermino: "05/07/2025",
    numeroAlumnos: 3,
    estadoRAD: "En Revisión",
    alumnosAsignados: [
      { id: 3, nombre: "Lucas Nicolás", primerApellido: "Carroza", segundoApellido: "Barahona", rut: "20.397.829-4", correo: "lucas.barahona@inacapmail.cl", telefono: "984 603 267", nombreEmergencia: "Edita Carroza", telefonoEmergencia: "961 336 642", institucion: "INACAP" },
      { id: 4, nombre: "María Ignacia", primerApellido: "Duarte", segundoApellido: "Cortez", rut: "20.726.668-4", correo: "mariai.duarte@inacapmail.cl", telefono: "966 906 660", nombreEmergencia: "María Elena Cortez", telefonoEmergencia: "999 383 771", institucion: "INACAP" },
      { id: 5, nombre: "Sofía Ester", primerApellido: "Gallardo", segundoApellido: "Rojas", rut: "20.481.541-0", correo: "sofia.gallardo@inacapmail.cl", telefono: "990 719 587", nombreEmergencia: "Susana Rojas", telefonoEmergencia: "962 293 274", institucion: "INACAP" },
    ],
  },
  {
    id: "NOM-2025-003",
    servicioClinico: "Traumatología",
    carrera: "Kinesiología",
    fechaInicio: "07/07/2025",
    fechaTermino: "16/08/2025",
    numeroAlumnos: 1,
    estadoRAD: "Recibida",
    alumnosAsignados: [
       { id: 6, nombre: "Juan Pablo", primerApellido: "Pérez", segundoApellido: "Gómez", rut: "20.111.222-3", correo: "juan.perez@inacapmail.cl", telefono: "912 345 678", nombreEmergencia: "Ana Gómez", telefonoEmergencia: "912 345 679", institucion: "INACAP" }
    ],
  },
];