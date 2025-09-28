"use client";

import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { OcupacionReporte } from "./data";

const chartConfig = {
  ocupacion: {
    label: "Ocupación (%)",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

interface OcupacionChartProps {
    data: OcupacionReporte[];
}

export function OcupacionChart({ data }: OcupacionChartProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Ocupación por Servicio Clínico</CardTitle>
        <CardDescription>Porcentaje de la capacidad total utilizada en el período seleccionado.</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="min-h-[300px] w-full">
          <BarChart accessibilityLayer data={data}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="servicio"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
            />
            <YAxis unit="%" />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dot" />}
            />
            <Bar dataKey="ocupacion" fill="var(--color-primary)" radius={4} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}