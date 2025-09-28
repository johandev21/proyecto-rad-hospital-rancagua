"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { toast } from "sonner";
import { CalendarIcon, Save } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { es } from "date-fns/locale";
import { format } from "date-fns";

const settingsFormSchema = z.object({
  valorHoraPregrado: z.coerce
    .number()
    .positive({ message: "El valor debe ser un número positivo." }),
  valorHoraPostgrado: z.coerce
    .number()
    .positive({ message: "El valor debe ser un número positivo." }),
  moneda: z
    .string()
    .length(3, { message: "El código debe tener 3 letras (ej. CLP)." }),
  inicioPeriodoAcademico: z.coerce.date({
    message: "Por favor, ingrese una fecha válida.",
  }),
  finPeriodoAcademico: z.coerce.date({
    message: "Por favor, ingrese una fecha válida.",
  }),
});

type SettingsFormValues = z.input<typeof settingsFormSchema>;

const defaultValues: Partial<SettingsFormValues> = {
  valorHoraPregrado: 4500,
  valorHoraPostgrado: 6000,
  moneda: "CLP",
};

export function GeneralSettingsForm() {
  const form = useForm<SettingsFormValues>({
    resolver: zodResolver(settingsFormSchema),
    defaultValues,
    mode: "onChange",
  });

  function onSubmit(data: SettingsFormValues) {
    console.log("Datos de configuración guardados:", data);

    toast.message("¡Éxito!", {
      description: "Los parámetros generales han sido actualizados.",
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <Card>
          <CardHeader>
            <CardTitle>Parámetros Financieros</CardTitle>
            <CardDescription>
              Define los valores base para los cálculos de retribuciones
              económicas.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-6 md:grid-cols-2">
            <FormField
              control={form.control}
              name="valorHoraPregrado"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Valor Hora Pregrado</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Ej: 4500"
                      {...field}
                      value={
                        field.value === undefined || field.value === null
                          ? ""
                          : Number(field.value)
                      }
                    />
                  </FormControl>
                  <FormDescription>
                    Valor en {form.watch("moneda")} por cada hora formativa de
                    pregrado.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="valorHoraPostgrado"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Valor Hora Postgrado</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Ej: 6000"
                      {...field}
                      value={
                        field.value === undefined || field.value === null
                          ? ""
                          : Number(field.value)
                      }
                    />
                  </FormControl>
                  <FormDescription>
                    Valor en {form.watch("moneda")} por cada hora formativa de
                    postgrado.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="moneda"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Código de Moneda</FormLabel>
                  <FormControl>
                    <Input placeholder="Ej: CLP" {...field} />
                  </FormControl>
                  <FormDescription>
                    Código ISO de 3 letras para la moneda de cálculo.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
        </Card>

        {/* Sección de Parámetros Académicos */}
        <Card>
          <CardHeader>
            <CardTitle>Parámetros Académicos</CardTitle>
            <CardDescription>
              Configura los períodos y otras reglas de la planificación
              académica.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-6 md:grid-cols-2">
            <FormField
              control={form.control}
              name="inicioPeriodoAcademico"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Inicio del Período Académico</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-full pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value &&
                          field.value instanceof Date &&
                          !isNaN(field.value.getTime()) ? (
                            format(field.value as Date, "PPP", { locale: es })
                          ) : (
                            <span>Seleccione una fecha</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value as Date | undefined}
                        onSelect={field.onChange}
                      />
                    </PopoverContent>
                  </Popover>
                  <FormDescription>
                    Fecha de inicio para la planificación de nuevas rotaciones.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="finPeriodoAcademico"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Fin del Período Académico</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-full pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value &&
                          field.value instanceof Date &&
                          !isNaN(field.value.getTime()) ? (
                            format(field.value as Date, "PPP", { locale: es })
                          ) : (
                            <span>Seleccione una fecha</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value as Date | undefined}
                        onSelect={field.onChange}
                        disabled={(date) =>
                          date <
                          (form.getValues("inicioPeriodoAcademico") ||
                            new Date(0))
                        }
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormDescription>
                    Fecha de término para la planificación de nuevas rotaciones.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
        </Card>

        <div className="flex justify-end">
          <Button type="submit" disabled={!form.formState.isDirty}>
            <Save className="mr-2 h-4 w-4" />
            Guardar Cambios
          </Button>
        </div>
      </form>
    </Form>
  );
}
