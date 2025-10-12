import { ViewRAD } from "./_components/rad/view-rad";
import { ViewCentroFormador } from "./_components/centro-formador/view-centro-formador";

type UserRole = "RAD" | "CentroFormador" | "JefeServicio";

async function getUserRole(): Promise<UserRole> {
  return "CentroFormador";
}

const viewMap: Record<UserRole, React.ReactNode> = {
  RAD: <ViewRAD />,
  CentroFormador: <ViewCentroFormador />,
  JefeServicio: <div>Vista de Jefe de Servicio (a construir)</div>,
};

export default async function ProgramacionPage() {
  const userRole = await getUserRole();

  const CurrentView = viewMap[userRole] || <div>Vista no autorizada.</div>;

  return <div className="p-4 sm:p-6 md:p-8">{CurrentView}</div>;
}
