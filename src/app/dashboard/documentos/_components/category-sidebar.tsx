"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface CategorySidebarProps {
  categories: string[];
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
  className?: string;
}

export function CategorySidebar({ categories, selectedCategory, onSelectCategory, className }: CategorySidebarProps) {
  return (
    <nav className={cn("flex flex-col space-y-1", className)}>
      {categories.map((category) => (
        <Button
          key={category}
          variant="ghost"
          className={cn(
            "w-full justify-start",
            selectedCategory === category && "bg-muted hover:bg-muted"
          )}
          onClick={() => onSelectCategory(category)}
        >
          {category}
        </Button>
      ))}
    </nav>
  );
}