"use client";

import React from "react";
import {
  useSidebar,
} from "@/components/ui/sidebar";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface SidebarTooltipWrapperProps {
  title: string; 
  children: React.ReactNode;
}

export function SidebarTooltipWrapper({ title, children }: SidebarTooltipWrapperProps) {
  const { state, isMobile } = useSidebar();
  
  const isCollapsed = state === "collapsed";

  const shouldShowTooltip = isCollapsed && !isMobile;

  if (!shouldShowTooltip) {
    return <>{children}</>;
  }

  return (
    <Tooltip delayDuration={150}>
      <TooltipTrigger asChild>{children}</TooltipTrigger>
      <TooltipContent side="right">{title}</TooltipContent>
    </Tooltip>
  );
}

interface TooltipProviderWrapperProps {
  children: React.ReactNode;
}

export function TooltipProviderWrapper({ children }: TooltipProviderWrapperProps) {
    return <TooltipProvider>{children}</TooltipProvider>;
}