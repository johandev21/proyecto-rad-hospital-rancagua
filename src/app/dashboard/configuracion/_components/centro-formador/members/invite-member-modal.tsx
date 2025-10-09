"use client";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { roles } from "./data";
import { UserPlus } from "lucide-react";

export function InviteMemberModal() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="sm"><UserPlus className="mr-2 h-4 w-4" />Invitar Miembro</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Invitar Nuevo Miembro</DialogTitle>
          <DialogDescription>
            La persona recibirá un correo electrónico para unirse a su organización.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="email">Correo Electrónico</Label>
            <Input id="email" type="email" placeholder="nombre@su-institucion.com" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="rol">Rol en la Organización</Label>
            <Select><SelectTrigger><SelectValue placeholder="Seleccione un rol" /></SelectTrigger>
              <SelectContent>{roles.map(r => <SelectItem key={r} value={r}>{r}</SelectItem>)}</SelectContent>
            </Select>
          </div>
        </div>
        <DialogFooter>
          <Button type="submit">Enviar Invitación</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}