import React from "react";
import { DashboardViewCentro } from "./_components/centro-formador/dashboard-view";
import { DashboardViewRAD } from "./_components/rad/dashboard-view";

type UserRole = "RAD" | "CentroFormador" | "JefeServicio";

async function getUserRole(): Promise<UserRole> {
  return "CentroFormador";
}

const dashboardViews: Record<UserRole, React.JSX.Element> = {
  RAD: <DashboardViewRAD />,
  CentroFormador: <DashboardViewCentro />,
  JefeServicio: <p>Panel de Jefe de Servicio (a construir)</p>,
};

export default async function DashboardPage() {
  const userRole = await getUserRole();

  const CurrentDashboardView = dashboardViews[userRole] || null;

  return <>{CurrentDashboardView}</>;
}
