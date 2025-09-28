import { ConfigurationTabs } from "./_components/configuration-tabs";

export default function ConfiguracionPage() {
  return (
    <div className="p-4 sm:p-6 md:p-8 space-y-6">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
          Configuración del Sistema
        </h1>
        <p className="text-muted-foreground">
          Administre usuarios, servicios y parámetros generales de la
          aplicación.
        </p>
      </div>
      <ConfigurationTabs />
    </div>
  );
}
