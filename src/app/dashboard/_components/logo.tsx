"use client";

import React from "react";
import Image from "next/image";
import logo from "../../../../public/logo.svg";
import logoCollapsed from "../../../../public/logo-collapsed.png";
import { useSidebar } from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";

export default function LogoHospital() {
  const { state } = useSidebar();
  const isExpanded = state === "expanded";

  return (
    <div
      className={cn(
        "relative flex items-center justify-center transition-all duration-300 ease-in-out",
        isExpanded ? "h-[51px] w-[177px] mb-4" : "h-[40px] w-[40px] mb-2"
      )}
    >
      <Image
        src={logo}
        alt="Logo institucional completo"
        className={cn(
          "absolute transition-opacity duration-300 ease-in-out dark:grayscale dark:invert",
          isExpanded ? "opacity-100" : "opacity-0"
        )}
        style={{
          width: "177px",
          height: "51px",
          objectFit: "contain",
        }}
      />

      <Image
        src={logoCollapsed}
        alt="Logo institucional colapsado"
        className={cn(
          "absolute transition-opacity duration-300 ease-in-out -ml-1.5",
          isExpanded ? "opacity-0" : "opacity-100"
        )}
        style={{
          width: "32px",
          height: "32px",
          objectFit: "contain",
        }}
      />
    </div>
  );
}
