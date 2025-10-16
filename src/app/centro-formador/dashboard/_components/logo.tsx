"use client";

import React from "react";
import Image from "next/image";
import { useSidebar } from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";

export default function LogoHospital() {
  const { state } = useSidebar();
  const isExpanded = state === "expanded";

  return (
    <div
      className={cn(
        "relative flex items-center justify-center transition-all duration-300 ease-in-out mb-4",
        isExpanded ? "h-[51px] w-[177px]" : "h-[40px] w-[40px]"
      )}
    >
      <Image
        src='/logo.svg'
        alt="Logo institucional completo"
        className={cn(
          "absolute transition-opacity duration-300 ease-in-out dark:grayscale dark:invert object-contain",
          isExpanded ? "opacity-100" : "opacity-0"
        )}
        width={177}
        height={51}
      />

      <Image
        src='/logo-collapsed.png'
        alt="Logo institucional colapsado"
        width={38}
        height={38}
        className={cn(
          "absolute transition-opacity duration-300 ease-in-out -ml-1.5 object-contain",
          isExpanded ? "opacity-0" : "opacity-100"
        )}
      />
    </div>
  );
}
