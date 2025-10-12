export const roles = ["Admin de Organización", "Miembro"] as const;
export type MemberRole = typeof roles[number];

export type Member = {
  id: string;
  nombre: string;
  correo: string;
  rol: MemberRole;
  estado: "Activo" | "Invitado";
};

export const membersData: Member[] = [
  { id: "MEM-001", nombre: "Ana García", correo: "ana.garcia@inacap.cl", rol: "Admin de Organización", estado: "Activo" },
  { id: "MEM-002", nombre: "Juan Torres", correo: "juan.torres@inacap.cl", rol: "Miembro", estado: "Activo" },
  { id: "MEM-003", nombre: "invitado@inacap.cl", correo: "invitado@inacap.cl", rol: "Miembro", estado: "Invitado" },
];