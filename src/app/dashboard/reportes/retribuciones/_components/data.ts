export type RetribucionReporte = {
  id: string;
  institucion: string;
  servicioClinico: string;
  alumnos: number;
  horasFormativas: number;
  valorHora: number;
  subtotal: number;
};

export const reportData: RetribucionReporte[] = [
  { id: "RET-01", institucion: "UOH", servicioClinico: "Medicina", alumnos: 12, horasFormativas: 540, valorHora: 4350, subtotal: 28188000 },
  { id: "RET-02", institucion: "INACAP", servicioClinico: "Cirugía", alumnos: 8, horasFormativas: 320, valorHora: 3500, subtotal: 8960000 },
  { id: "RET-03", institucion: "AIEP", servicioClinico: "Pediatría", alumnos: 10, horasFormativas: 400, valorHora: 3800, subtotal: 15200000 },
  { id: "RET-04", institucion: "UOH", servicioClinico: "Ginecología", alumnos: 8, horasFormativas: 360, valorHora: 4350, subtotal: 12528000 },
];