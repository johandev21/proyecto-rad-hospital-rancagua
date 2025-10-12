import { ConfigurationViewCentro as ViewCentroFormador } from "./_components/centro-formador/configuration-view";
import { ConfigurationTabs as ViewRAD } from "./_components/rad/configuration-tabs"

type UserRole = "RAD" | "CentroFormador" | "JefeServicio";

async function getUserRole(): Promise<UserRole> {
  return "CentroFormador"; 
}

const viewMap: Record<UserRole, React.ReactNode> = {
  "RAD": <ViewRAD />,
  "CentroFormador": <ViewCentroFormador />,
  "JefeServicio": <div className="text-muted-foreground">La configuración no está disponible para este rol.</div>, // Placeholder
};

export default async function ConfiguracionPage() {
  const userRole = await getUserRole();

  const CurrentView = viewMap[userRole] || <div>Vista no autorizada.</div>;

  return (
    <div className="p-4 sm:p-6 md:p-8 space-y-6">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Configuración</h1>
        <p className="text-muted-foreground">
          {userRole === "RAD" 
            ? "Administre usuarios, servicios y parámetros generales de la aplicación."
            : "Gestione los parámetros y la configuración de su cuenta."
          }
        </p>
      </div>
      {CurrentView}
    </div>
  );
}