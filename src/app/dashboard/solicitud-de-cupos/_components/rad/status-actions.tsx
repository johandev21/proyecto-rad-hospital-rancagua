"use client";

import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Check, Pencil, X } from "lucide-react";

export function StatusActions() {
  return (
    <TooltipProvider delayDuration={0}>
      <div className="flex items-center justify-center space-x-1">
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="ghost" size="icon" className="h-8 w-8 hover:text-primary">
              <Pencil className="h-4 w-4" />
              <span className="sr-only">Editar</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent>Editar Solicitud</TooltipContent>
        </Tooltip>
        
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="ghost" size="icon" className="h-8 w-8 hover:text-green-500">
              <Check className="h-4 w-4" />
              <span className="sr-only">Aprobar</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent>Aprobar Solicitud</TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="ghost" size="icon" className="h-8 w-8 hover:text-red-500">
              <X className="h-4 w-4" />
              <span className="sr-only">Rechazar</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent>Rechazar Solicitud</TooltipContent>
        </Tooltip>
      </div>
    </TooltipProvider>
  );
}