export type Documento = {
  id: string;
  nombre: string;
  categoria: "Protocolos" | "Normativas" | "Guías Clínicas" | "Formatos";
  version: string;
  fechaSubida: string;
  subidoPor: string;
  tipoArchivo: "pdf" | "word" | "excel" | "otro";
};

export const categorias = [
  "Todos",
  "Protocolos",
  "Normativas",
  "Guías Clínicas",
  "Formatos",
];

export const data: Documento[] = [
  {
    id: "DOC-001",
    nombre: "Protocolo de Cirugía Bariátrica.pdf",
    categoria: "Protocolos",
    version: "v2.1",
    fechaSubida: "2025-09-15",
    subidoPor: "Dr. Soto",
    tipoArchivo: "pdf",
  },
  {
    id: "DOC-002",
    nombre: "Normativa de Consentimiento Informado.docx",
    categoria: "Normativas",
    version: "v1.5",
    fechaSubida: "2025-09-10",
    subidoPor: "Admin",
    tipoArchivo: "word",
  },
  {
    id: "DOC-003",
    nombre: "Guía de Manejo de Sepsis.pdf",
    categoria: "Guías Clínicas",
    version: "v3.0",
    fechaSubida: "2025-08-22",
    subidoPor: "Dra. Ponce",
    tipoArchivo: "pdf",
  },
  {
    id: "DOC-004",
    nombre: "Formato de Epicrisis.xlsx",
    categoria: "Formatos",
    version: "v1.0",
    fechaSubida: "2025-07-30",
    subidoPor: "Admin",
    tipoArchivo: "excel",
  },
  {
    id: "DOC-005",
    nombre: "Protocolo de Higiene de Manos.pdf",
    categoria: "Protocolos",
    version: "v1.8",
    fechaSubida: "2025-09-18",
    subidoPor: "Enf. López",
    tipoArchivo: "pdf",
  },
];

export type VersionHistorial = {
  version: string;
  fechaSubida: string;
  subidoPor: string;
  notas: string;
};

export const historialData: { [key: string]: VersionHistorial[] } = {
  "DOC-001": [
    { version: "v2.1", fechaSubida: "2025-09-15", subidoPor: "Dr. Soto", notas: "Actualización anual, se ajustaron los criterios de inclusión." },
    { version: "v2.0", fechaSubida: "2024-08-20", subidoPor: "Dr. Soto", notas: "Versión inicial revisada por el comité." },
    { version: "v1.0", fechaSubida: "2024-01-10", subidoPor: "Admin", notas: "Borrador inicial subido para revisión." },
  ],
  "DOC-002": [
    { version: "v1.5", fechaSubida: "2025-09-10", subidoPor: "Admin", notas: "Se añade cláusula sobre protección de datos." },
    { version: "v1.4", fechaSubida: "2025-02-03", subidoPor: "Admin", notas: "Ajustes menores de formato." },
  ]
};