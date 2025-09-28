"use client";

import * as React from "react";
import { CategorySidebar } from "./_components/category-sidebar";
import { DocumentBrowser } from "./_components/document-browser";
import { data, categorias } from "./_components/data";
import { Card, CardContent } from "@/components/ui/card";

export default function DocumentosPage() {
  const [selectedCategory, setSelectedCategory] = React.useState("Todos");

  const filteredDocuments = React.useMemo(() => {
    if (selectedCategory === "Todos") {
      return data;
    }
    return data.filter((doc) => doc.categoria === selectedCategory);
  }, [selectedCategory]);

  return (
    <div className="p-4 sm:p-6 md:p-8">
      <div className="mb-6">
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
          Gestión Documental
        </h1>
        <p className="text-muted-foreground">
          Encuentre, organice y gestione todos los protocolos y documentos
          institucionales.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-[240px_1fr] gap-8">
        <aside>
          <h2 className="text-lg font-semibold mb-2 px-2">Categorías</h2>
          <Card>
            <CardContent>
              <CategorySidebar
                categories={categorias}
                selectedCategory={selectedCategory}
                onSelectCategory={setSelectedCategory}
              />
            </CardContent>
          </Card>
        </aside>
        <main>
          <Card>
            <CardContent>
              <DocumentBrowser documentos={filteredDocuments} />
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
}
