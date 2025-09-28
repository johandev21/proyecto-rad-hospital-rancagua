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

const chartData = [
  { service: "Medicina", students: 28, fill: "var(--color-medicina)" },
  { service: "Cirugía", students: 22, fill: "var(--color-cirugia)" },
  { service: "Pediatría", students: 18, fill: "var(--color-pediatria)" },
  { service: "Ginecología", students: 25, fill: "var(--color-ginecologia)" },
  { service: "Urgencias", students: 31, fill: "var(--color-urgencias)" },
  { service: "Puerperio", students: 15, fill: "var(--color-puerperio)" },
];

const chartConfig = {
  students: {
    label: "Alumnos",
  },
  medicina: {
    label: "Medicina",
    color: "hsl(var(--chart-1))",
  },
  cirugia: {
    label: "Cirugía",
    color: "hsl(var(--chart-2))",
  },
  pediatria: {
    label: "Pediatría",
    color: "hsl(var(--chart-3))",
  },
  ginecologia: {
    label: "Ginecología",
    color: "hsl(var(--chart-4))",
  },
  urgencias: {
    label: "Urgencias",
    color: "hsl(var(--chart-5))",
  },
  puerperio: {
    label: "Puerperio",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

export function OverviewChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Ocupación de Servicios Clínicos</CardTitle>
        <CardDescription>Alumnos actualmente en rotación por servicio.</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="min-h-[300px] w-full">
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="service"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value: any) => value.slice(0, 3)} 
            />
            <YAxis />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dot" />}
            />
            <Bar dataKey="students" radius={4}>
                {chartData.map((entry) => (
                    <Cell key={entry.service} fill={entry.fill} />
                ))}
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}