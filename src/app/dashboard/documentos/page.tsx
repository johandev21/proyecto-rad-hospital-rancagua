import { CategorySidebar } from "./_components/category-sidebar";
import { DocumentBrowser } from "./_components/document-browser";
import { data, categorias } from "./_components/data";
import { Toolbar } from "./_components/toolbar";

export default async function DocumentosPage({
  searchParams,
}: {
  searchParams?: {
    category?: string;
    q?: string;
    view?: "list" | "grid";
  };
}) {
  const selectedCategory = searchParams?.category || "Todos";
  const searchTerm = searchParams?.q || "";
  const view = searchParams?.view || "grid";

  const filteredDocuments = data.filter((doc) => {
    const categoryMatch =
      selectedCategory === "Todos" || doc.categoria === selectedCategory;
    const searchMatch = doc.nombre
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    return categoryMatch && searchMatch;
  });

  return (
    <div className="p-4 sm:p-6 md:p-8">
      <div className="mb-6">
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
          Gestión Documental
        </h1>
        <p className="text-muted-foreground">
          Encuentre, organice y gestione todos los protocolos institucionales.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-[240px_1fr] gap-8">
        <aside>
          <h2 className="text-lg font-semibold mb-2 px-2">Categorías</h2>
          <CategorySidebar categories={categorias} />
        </aside>
        <main className="space-y-4">
          <Toolbar categorias={categorias} />
          <DocumentBrowser documentos={filteredDocuments} view={view} />
        </main>
      </div>
    </div>
  );
}
