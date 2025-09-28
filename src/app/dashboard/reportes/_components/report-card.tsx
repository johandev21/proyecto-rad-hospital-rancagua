import Link from "next/link";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Reporte } from "./data";
import { ArrowRight } from "lucide-react";

interface ReportCardProps {
  report: Reporte;
}

export function ReportCard({ report }: ReportCardProps) {
  const Icon = report.icon;

  return (
    <Link href={report.href} className="group">
      <Card className="h-full transition-all group-hover:border-primary group-hover:shadow-md">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg">{report.title}</CardTitle>
            <Icon className="h-6 w-6 text-muted-foreground" />
          </div>
          <CardDescription className="pt-2">{report.description}</CardDescription>
        </CardHeader>
        <div className="px-6 pb-4 flex justify-end">
            <div className="flex items-center text-sm font-semibold text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                Generar Reporte
                <ArrowRight className="ml-2 h-4 w-4" />
            </div>
        </div>
      </Card>
    </Link>
  );
}