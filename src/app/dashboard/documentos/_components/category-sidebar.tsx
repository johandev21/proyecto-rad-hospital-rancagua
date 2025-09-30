"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface CategorySidebarProps {
  categories: string[];
}

export function CategorySidebar({ categories }: CategorySidebarProps) {
  const searchParams = useSearchParams();
  const selectedCategory = searchParams.get("category") || "Todos";

  return (
    <Card>
      <CardContent className="px-3">
        <nav className="flex flex-col space-y-1">
          {categories.map((category) => (
            <Link
              key={category}
              href={
                category === "Todos"
                  ? "/dashboard/documentos"
                  : `?category=${category}`
              }
              className={cn(
                buttonVariants({ variant: "ghost" }),
                "w-full justify-start",
                selectedCategory === category && "bg-muted hover:bg-muted"
              )}
            >
              {category}
            </Link>
          ))}
        </nav>
      </CardContent>
    </Card>
  );
}
