export type OcupacionReporte = {
  servicio: string;
  capacidadTotal: number;
  alumnosAsignados: number;
  horasFormativas: number;
  ocupacion: number; 
};

export const reportData: OcupacionReporte[] = [
  { servicio: "Medicina", capacidadTotal: 40, alumnosAsignados: 28, horasFormativas: 15120, ocupacion: 70 },
  { servicio: "Cirugía", capacidadTotal: 30, alumnosAsignados: 22, horasFormativas: 11880, ocupacion: 73.3 },
  { servicio: "Pediatría", capacidadTotal: 25, alumnosAsignados: 18, horasFormativas: 9720, ocupacion: 72 },
  { servicio: "Ginecología", capacidadTotal: 25, alumnosAsignados: 25, horasFormativas: 13500, ocupacion: 100 },
  { servicio: "Urgencias", capacidadTotal: 35, alumnosAsignados: 31, horasFormativas: 16740, ocupacion: 88.5 },
  { servicio: "Puerperio", capacidadTotal: 20, alumnosAsignados: 15, horasFormativas: 8100, ocupacion: 75 },
];