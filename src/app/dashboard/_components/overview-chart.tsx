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
  { service: "Medicina", students: 28, fill: "var(--chart-1)" },
  { service: "Cirugía", students: 22, fill: "var(--chart-2)" },
  { service: "Pediatría", students: 18, fill: "var(--chart-3)" },
  { service: "Ginecología", students: 25, fill: "var(--chart-4)" },
  { service: "Urgencias", students: 31, fill: "var(--chart-5)" },
  { service: "Puerperio", students: 15, fill: "var(--chart-1)" },
];

const chartConfig = {
  students: {
    label: "Alumnos",
  },
  Medicina: {
    label: "Medicina",
    color: "var(--chart-1)",
  },
  Cirugía: {
    label: "Cirugía",
    color: "var(--chart-2)",
  },
  Pediatría: {
    label: "Pediatría",
    color: "var(--chart-3)",
  },
  Ginecología: {
    label: "Ginecología",
    color: "var(--chart-4)",
  },
  Urgencias: {
    label: "Urgencias",
    color: "var(--chart-5)",
  },
  Puerperio: {
    label: "Puerperio",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig;

export function OverviewChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Ocupación de Servicios Clínicos</CardTitle>
        <CardDescription>
          Alumnos actualmente en rotación por servicio.
        </CardDescription>
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
              tickFormatter={(value: string) => value.slice(0, 3)}
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
