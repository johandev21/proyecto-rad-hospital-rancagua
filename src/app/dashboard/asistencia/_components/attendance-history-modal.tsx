"use client";

import * as React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Asistencia, AsistenciaHistorial, historyData } from "./data";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

interface AttendanceHistoryModalProps {
  asistencia: Asistencia;
  children: React.ReactNode;
}

export function AttendanceHistoryModal({ asistencia, children }: AttendanceHistoryModalProps) {
  // En una app real, este fetch se haría al abrir el modal
  const studentHistory = historyData[asistencia.id] || [];
  
  // Calculamos los modificadores para el calendario
  const modifiers = {
    presente: studentHistory.filter(d => d.estado === 'Presente').map(d => d.date),
    ausente: studentHistory.filter(d => d.estado === 'Ausente').map(d => d.date),
    justificado: studentHistory.filter(d => d.estado === 'Justificado').map(d => d.date),
  };

  const totalDays = studentHistory.length;
  const presentDays = modifiers.presente.length;
  const attendancePercentage = totalDays > 0 ? Math.round((presentDays / totalDays) * 100) : 0;

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-xl">Historial de Asistencia</DialogTitle>
          <div className="flex items-center space-x-3 pt-2 text-sm text-muted-foreground">
             <Avatar className="h-10 w-10">
                <AvatarFallback>{asistencia.alumno.nombre.split(" ").map(n => n[0]).join("").substring(0,2)}</AvatarFallback>
            </Avatar>
            <div>
                <p className="font-semibold text-primary">{asistencia.alumno.nombre}</p>
                <p>{asistencia.servicioClinico} - {asistencia.alumno.institucion}</p>
            </div>
          </div>
        </DialogHeader>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 py-4">
          <div className="md:col-span-2">
            <Calendar
              mode="multiple"
              selected={studentHistory.map(h => h.date)}
              defaultMonth={studentHistory[0]?.date || new Date()}
              className="rounded-md border p-0"
              modifiers={modifiers}
              modifiersClassNames={{
                presente: 'bg-green-100 text-green-800 rounded-full',
                ausente: 'bg-red-100 text-red-800 rounded-full',
                justificado: 'bg-yellow-100 text-yellow-800 rounded-full',
              }}
            />
          </div>
          <div className="space-y-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Resumen</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{attendancePercentage}%</div>
                <p className="text-xs text-muted-foreground">
                  {presentDays} de {totalDays} días asistidos
                </p>
              </CardContent>
            </Card>
            <div className="space-y-2 text-sm">
                <p className="font-semibold">Leyenda</p>
                <div className="flex items-center"><div className="w-3 h-3 rounded-full bg-green-100 border border-green-300 mr-2"></div>Presente</div>
                <div className="flex items-center"><div className="w-3 h-3 rounded-full bg-red-100 border border-red-300 mr-2"></div>Ausente</div>
                <div className="flex items-center"><div className="w-3 h-3 rounded-full bg-yellow-100 border border-yellow-300 mr-2"></div>Justificado</div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}