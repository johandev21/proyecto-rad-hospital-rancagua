import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { AlertCircle, FilePlus } from "lucide-react";
import { tasksData } from "./data/centro-formador-data";

export function PendingTasks() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Tareas Pendientes</CardTitle>
        <CardDescription>Acciones que requieren tu atención inmediata.</CardDescription>
      </CardHeader>
      <CardContent>
        {tasksData.map((task) => (
          <Link href={task.href} key={task.title}>
            <div className="flex items-start space-x-4 p-3 rounded-lg hover:bg-muted transition-colors">
              <div className="mt-1">
                {task.status === 'action_required' 
                    ? <AlertCircle className="h-5 w-5 text-destructive" /> 
                    : <FilePlus className="h-5 w-5 text-blue-500" />
                }
              </div>
              <div>
                <p className="font-semibold">{task.title}</p>
                <p className="text-sm text-muted-foreground">{task.description}</p>
              </div>
            </div>
          </Link>
        ))}
      </CardContent>
    </Card>
  );
}