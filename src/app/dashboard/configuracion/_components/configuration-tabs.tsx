"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { UsersDataTable } from "./tabs-content/users/data-table";
import { data as usersData } from "./tabs-content/users/data";
import { columns as usersColumns } from "./tabs-content/users/columns";
import { data as servicesData } from "./tabs-content/services/data";
import { columns as servicesColumns } from "./tabs-content/services/columns";
import { Card, CardContent } from "@/components/ui/card";
import { ServicesDataTable } from "./tabs-content/services/data-table";
import { GeneralSettingsForm } from "./tabs-content/general/general-settings-form";

export function ConfigurationTabs() {
  return (
    <Tabs defaultValue="users" className="w-full">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="users">Gestión de Usuarios</TabsTrigger>
        <TabsTrigger value="services">Servicios Clínicos</TabsTrigger>
        <TabsTrigger value="general">Parámetros Generales</TabsTrigger>
      </TabsList>
      <TabsContent value="users" className="mt-4">
        <Card>
          <CardContent>
            <UsersDataTable columns={usersColumns} data={usersData} />
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="services" className="mt-4">
        <Card>
          <CardContent>
            <ServicesDataTable columns={servicesColumns} data={servicesData} />
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="general" className="mt-4">
        <Card>
          <CardContent>
            <GeneralSettingsForm />
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
}
