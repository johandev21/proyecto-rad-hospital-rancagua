"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Building, Users } from "lucide-react";

import { MembersDataTable } from "./members/members-data-table";
import { columns as membersColumns } from "./members/columns";
import { membersData } from "./members/data";

const organizationData = {
  name: "INACAP Sede Rancagua",
  initials: "IN",
  membersCount: 5,
  status: "Activa",
  createdAt: "15 de Enero, 2024",
};

export function ConfigurationViewCentro() {
  return (
    <Tabs defaultValue="organization">
      <div className="max-w-[500px]">
        <TabsList className="grid w-full h-full grid-cols-2 bg-card p-0 border-none">
          <TabsTrigger value="organization" className="py-2.5 rounded-r-none">
            <Building className="size-4 sm:mr-2" />
            <span className="hidden sm:inline">Mi Organización</span>
          </TabsTrigger>
          <TabsTrigger value="members" className="py-2.5 rounded-l-none">
            <Users className="size-4 sm:mr-2" />
            <span className="hidden sm:inline">Miembros del Equipo</span>
          </TabsTrigger>
        </TabsList>
      </div>

      {/* Pestaña 1: Mi Organización (Rediseñada) */}
      <TabsContent value="organization" className="mt-6">
        <Card>
          <CardHeader>
            <CardTitle>Perfil de la Organización</CardTitle>
            <CardDescription>
              Información general y de contacto de su institución.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {/* Layout de 2 columnas con Avatar */}
            <div className="flex flex-col sm:flex-row items-start gap-8">
              <Avatar className="h-24 w-24">
                <AvatarFallback className="text-3xl font-semibold">
                  {organizationData.initials}
                </AvatarFallback>
              </Avatar>
              <div className="grid flex-1 gap-4">
                <div className="grid gap-2">
                  <h3 className="text-2xl font-bold">
                    {organizationData.name}
                  </h3>
                  <div className="flex items-center gap-2">
                    <Badge className="bg-green-100 text-green-800">
                      {organizationData.status}
                    </Badge>
                    <span className="text-sm text-muted-foreground">
                      Miembro desde {organizationData.createdAt}
                    </span>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4 pt-2">
                  <div className="flex flex-col space-y-1.5">
                    <span className="text-sm font-medium text-muted-foreground">
                      Miembros
                    </span>
                    <p className="font-semibold">
                      {organizationData.membersCount}
                    </p>
                  </div>
                  <div className="flex flex-col space-y-1.5">
                    <span className="text-sm font-medium text-muted-foreground">
                      Teléfono de Contacto
                    </span>
                    <p className="font-semibold">(No especificado)</p>
                  </div>
                </div>
                <div className="flex gap-2 pt-2">
                  <Button variant="outline" disabled>
                    Editar Perfil
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      {/* Pestaña 2: Miembros del Equipo (Placeholder) */}
      <TabsContent value="members" className="mt-6">
        <Card>
          <CardHeader>
            <CardTitle>Gestión de Miembros del Equipo</CardTitle>
            <CardDescription>
              Añada, edite y gestione los perfiles de los usuarios de su
              organización.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <MembersDataTable columns={membersColumns} data={membersData} />
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
}
