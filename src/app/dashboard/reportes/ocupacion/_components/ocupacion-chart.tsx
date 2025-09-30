"use client";

import * as React from "react";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Cell } from "recharts";
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

interface OcupacionChartProps {
  data: OcupacionReporte[];
}

export function OcupacionChart({ data }: OcupacionChartProps) {
  const chartConfig = React.useMemo(() => {
    const config: ChartConfig = {
      ocupacion: {
        label: "Ocupación (%)",
      },
    };
    data.forEach((item, index) => {
      config[item.servicio] = {
        label: item.servicio,
        color: `var(--chart-${(index % 5) + 1})`,
      };
    });
    return config;
  }, [data]);

  const chartData = React.useMemo(() => {
    return data.map((item, index) => ({
      ...item,
      fill: `var(--chart-${(index % 5) + 1})`,
    }));
  }, [data]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Ocupación por Servicio Clínico</CardTitle>
        <CardDescription>
          Porcentaje de la capacidad total utilizada en el período seleccionado.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="min-h-[300px] w-full">
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="servicio"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value: string) => value.slice(0, 3)}
            />
            <YAxis unit="%" />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dot" />}
            />
            <Bar dataKey="ocupacion" radius={4}>
              {chartData.map((entry) => (
                <Cell key={`cell-${entry.servicio}`} fill={entry.fill} />
              ))}
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
