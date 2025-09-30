"use client";

import * as React from "react";
import { Pie, PieChart, Cell } from "recharts";
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
import { RetribucionReporte } from "./data";

interface RetributionsChartProps {
  data: RetribucionReporte[];
}

export function RetributionsChart({ data }: RetributionsChartProps) {
  const aggregatedData = React.useMemo(() => {
    const institutionMap = new Map<string, number>();
    data.forEach((item) => {
      institutionMap.set(
        item.institucion,
        (institutionMap.get(item.institucion) || 0) + item.subtotal
      );
    });
    return Array.from(institutionMap, ([institucion, total]) => ({
      institucion,
      total,
    }));
  }, [data]);

  const chartConfig = React.useMemo(() => {
    const config: ChartConfig = {};
    aggregatedData.forEach((item, index) => {
      config[item.institucion] = {
        label: item.institucion,
        color: `var(--chart-${(index % 5) + 1})`,
      };
    });
    return config;
  }, [aggregatedData]);

  const totalValue = React.useMemo(() => {
    return aggregatedData.reduce((acc, curr) => acc + curr.total, 0);
  }, [aggregatedData]);

  return (
    <Card className="flex flex-col h-full">
      <CardHeader>
        <CardTitle>Distribución por Institución</CardTitle>
        <CardDescription>
          Porcentaje del total de retribuciones por cada institución en el
          período.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[300px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={aggregatedData}
              dataKey="total"
              nameKey="institucion"
              innerRadius={60}
              strokeWidth={5}
              stroke="var(--card)"
            >
              {aggregatedData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={chartConfig[entry.institucion]?.color}
                />
              ))}
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
      <div className="flex flex-col items-center justify-center p-4 mt-auto border-t">
        <span className="text-xs text-muted-foreground">Retribución Total</span>
        <span className="text-lg font-bold">
          {new Intl.NumberFormat("es-CL", {
            style: "currency",
            currency: "CLP",
          }).format(totalValue)}
        </span>
      </div>
    </Card>
  );
}
