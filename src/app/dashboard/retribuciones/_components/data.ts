// Define el tipo de dato para cada línea de cálculo de retribución
export type Retribucion = {
  id: string;
  institucion: "INACAP" | "UOH" | "AIEP";
  servicioClinico: string;
  carrera: string;
  alumnos: number;
  horasFormativas: number;
  valorHora: number; // en CLP para este ejemplo
  subtotal: number;
};

// Datos de ejemplo que simulan el resultado de los cálculos
export const data: Retribucion[] = [
  {
    id: "RET-01",
    institucion: "UOH",
    servicioClinico: "Medicina",
    carrera: "Medicina",
    alumnos: 12,
    horasFormativas: 540,
    valorHora: 4350,
    subtotal: 28188000,
  },
  {
    id: "RET-02",
    institucion: "INACAP",
    servicioClinico: "Cirugía",
    carrera: "Tens",
    alumnos: 8,
    horasFormativas: 320,
    valorHora: 3500,
    subtotal: 8960000,
  },
  {
    id: "RET-03",
    institucion: "AIEP",
    servicioClinico: "Pediatría",
    carrera: "Enfermería",
    alumnos: 10,
    horasFormativas: 400,
    valorHora: 3800,
    subtotal: 15200000,
  },
  {
    id: "RET-04",
    institucion: "UOH",
    servicioClinico: "Ginecología",
    carrera: "Medicina",
    alumnos: 8,
    horasFormativas: 360,
    valorHora: 4350,
    subtotal: 12528000,
  },
];