"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Users, Hospital, Settings } from "lucide-react";

import { UsersDataTable } from "./tabs-content/users/data-table"; 
import { data as usersData } from "./tabs-content/users/data";
import { columns as usersColumns } from "./tabs-content/users/columns";

import { ServicesDataTable } from "./tabs-content/services/data-table";
import { data as servicesData } from "./tabs-content/services/data";
import { columns as servicesColumns } from "./tabs-content/services/columns";

import { GeneralSettingsForm } from "./tabs-content/general/general-settings-form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export function ConfigurationTabs() {
  return (
    <Tabs defaultValue="users" className="w-full">
      <TabsList className="grid w-full grid-cols-3 h-full">
        
        <TabsTrigger value="users">
          <Users className="size-4 sm:mr-2" />
          <span className="hidden sm:inline">Gestión de Usuarios</span>
        </TabsTrigger>
        
        <TabsTrigger value="services">
          <Hospital className="size-4 sm:mr-2" />
          <span className="hidden sm:inline">Servicios Clínicos</span>
        </TabsTrigger>
        
        <TabsTrigger value="general">
          <Settings className="size-4 sm:mr-2" />
          <span className="hidden sm:inline">Parámetros</span>
        </TabsTrigger>

      </TabsList>

      <TabsContent value="users" className="mt-6">
        <Card>
          <CardHeader>
            <CardTitle>Gestión de Usuarios</CardTitle>
            <CardDescription>
              Añada, edite y gestione los perfiles de usuario y sus roles en el sistema.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <UsersDataTable columns={usersColumns} data={usersData} />
          </CardContent>
        </Card>
      </TabsContent>
      
      <TabsContent value="services" className="mt-4">
        <Card>
           <CardHeader>
            <CardTitle>Servicios Clínicos</CardTitle>
            <CardDescription>
              Administre los servicios hospitalarios disponibles y su capacidad formadora.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ServicesDataTable columns={servicesColumns} data={servicesData} />
          </CardContent>
        </Card>
      </TabsContent>
      
      <TabsContent value="general" className="mt-4">
        <Card>
           <CardHeader>
            <CardTitle>Parámetros Generales</CardTitle>
            <CardDescription>
              Configure las reglas de negocio y los valores globales de la aplicación.
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <GeneralSettingsForm />
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
}