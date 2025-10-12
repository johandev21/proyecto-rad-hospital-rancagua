"use client";

import * as React from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Nomina, SolicitudAprobada, solicitudesAprobadasData } from "./data";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";
import { Trash2, PlusCircle, FileUp } from "lucide-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const nominaSchema = z.object({
  solicitudId: z.string().min(1, "Debe seleccionar una solicitud de cupos."),
  docenteSupervisor: z.string().optional(),
  notas: z.string().optional(),
  alumnos: z
    .array(
      z.object({
        nombre: z.string().min(3, "El nombre es requerido."),
        rut: z.string().min(9, "El RUT es requerido."),
        certificado: z.any().optional(),
      })
    )
    .min(1, "Debe añadir al menos un alumno."),
});
type FormValues = z.infer<typeof nominaSchema>;

interface NominaFormProps {
  nomina?: Nomina;
  onSubmit: (data: FormValues) => void;
}

export function NominaForm({ nomina, onSubmit }: NominaFormProps) {
  const form = useForm<FormValues>({
    resolver: zodResolver(nominaSchema),
    defaultValues: {
      solicitudId: nomina?.solicitudId || "",
      docenteSupervisor: nomina?.docenteSupervisor || "",
      notas: nomina?.notas || "",
      alumnos: nomina?.alumnos || [],
    },
  });

  const { control, handleSubmit, watch } = form;

  const { fields, append, remove } = useFieldArray({
    control,
    name: "alumnos",
  });

  const watchedSolicitudId = watch("solicitudId");
  const watchedAlumnos = watch("alumnos");

  const selectedRequest = React.useMemo(
    () => solicitudesAprobadasData.find((s) => s.id === watchedSolicitudId),
    [watchedSolicitudId]
  );

  const isLimitReached = selectedRequest
    ? watchedAlumnos.length >= selectedRequest.cuposAprobados
    : true;

  return (
    <Form {...form}>
      <form
        id="nomina-form"
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-6"
      >
        {/* SELECCIONAR SOLICITUD */}
        <FormField
          control={control}
          name="solicitudId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Solicitud de Cupos Aprobada</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccione la solicitud..." />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {solicitudesAprobadasData.map((req) => (
                    <SelectItem
                      key={req.id}
                      value={req.id}
                    >{`${req.id} - ${req.servicioClinico} (${req.cuposAprobados} cupos)`}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* CONTENIDO DINÁMICO */}
        {selectedRequest && (
          <Card className="bg-muted/50">
            <CardHeader>
              <CardDescription className="flex justify-between items-center">
                <span>
                  Asignando a{" "}
                  <span className="font-semibold text-primary">
                    {selectedRequest.servicioClinico}
                  </span>
                </span>
                <span className="font-semibold">
                  {watchedAlumnos.length} / {selectedRequest.cuposAprobados}{" "}
                  Cupos
                </span>
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* LISTA DE ALUMNOS */}
              {fields.map((field, index) => (
                <div
                  key={field.id}
                  className="grid grid-cols-1 gap-4 rounded-lg border bg-background p-4 relative sm:grid-cols-2"
                >
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute -top-3 -right-3 h-7 w-7 bg-background"
                    onClick={() => remove(index)}
                  >
                    <Trash2 className="h-4 w-4 text-destructive" />
                  </Button>
                  <FormField
                    control={control}
                    name={`alumnos.${index}.nombre`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nombre Alumno</FormLabel>
                        <FormControl>
                          <Input placeholder="Nombre completo..." {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={control}
                    name={`alumnos.${index}.rut`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>RUT</FormLabel>
                        <FormControl>
                          <Input placeholder="12.345.678-9" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              ))}
              <div className="flex flex-col sm:flex-row gap-2">
                <Button
                  type="button"
                  variant="default"
                  className="flex-1"
                  onClick={() => append({ nombre: "", rut: "" })}
                  disabled={isLimitReached}
                >
                  <PlusCircle className="mr-2 h-4 w-4" />
                  Añadir Alumno
                </Button>
                <Button type="button" variant="secondary" className="flex-1">
                  <FileUp className="mr-2 h-4 w-4" />
                  Importar
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* INFORMACIÓN ADICIONAL */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={control}
            name="docenteSupervisor"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Docente Supervisor (Opcional)</FormLabel>
                <FormControl>
                  <Input placeholder="Nombre del docente..." {...field} />
                </FormControl>
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={control}
          name="notas"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Notas Adicionales (Opcional)</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Indique aquí cualquier requerimiento especial..."
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}
