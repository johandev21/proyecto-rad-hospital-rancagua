"use client";

import * as React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Usuario, roles, UserRole, UserStatus } from "./data";
import { ArrowLeft, UserPlus, Send } from "lucide-react";
import { Combobox, ComboboxOption } from "@/components/combobox";
import { Separator } from "@/components/ui/separator";

const centrosFormadores: ComboboxOption[] = [
    { value: "Inacap", label: "Inacap" },
    { value: "Universidad Bernardo O’Higgins", label: "Universidad Bernardo O’Higgins" },
    { value: "Universidad de Talca", label: "Universidad de Talca" },
    { value: "Universidad Diego Portales", label: "Universidad Diego Portales" },
    { value: "Profesional IPCHILE", label: "Profesional IPCHILE" },
    { value: "Universidad Católica del Maule (UCM)", label: "Universidad Católica del Maule (UCM)" },
    { value: "Universidad de Tarapacá", label: "Universidad de Tarapacá" },
    { value: "Universidad San Sebastián", label: "Universidad San Sebastián" },
    { value: "Instituto Profesional Santo Tomás", label: "Instituto Profesional Santo Tomás" },
    { value: "Universidad de O’Higgins", label: "Universidad de O’Higgins" },
    { value: "Universidad de Valparaíso", label: "Universidad de Valparaíso" },
    { value: "Universidad Andrés Bello", label: "Universidad Andrés Bello" },
    { value: "Universidad del Desarrollo", label: "Universidad del Desarrollo" },
    { value: "Universidad de Santiago de Chile", label: "Universidad de Santiago de Chile" },
];

const serviciosClinicos: ComboboxOption[] = [
    { value: "Medicina", label: "Medicina" },
    { value: "Cirugía", label: "Cirugía" },
    { value: "Pediatría", label: "Pediatría" },
    { value: "Ginecología y Obstetricia", label: "Ginecología y Obstetricia" },
    { value: "Traumatología y Ortopedia", label: "Traumatología y Ortopedia" },
    { value: "Urgencias", label: "Urgencias" },
    { value: "UCI (Unidad de Cuidados Intensivos)", label: "UCI (Unidad de Cuidados Intensivos)" },
    { value: "UTI (Unidad de Tratamiento Intermedio)", label: "UTI (Unidad de Tratamiento Intermedio)" },
    { value: "Cardiología", label: "Cardiología" },
    { value: "Neurología", label: "Neurología" },
    { value: "Salud Mental / Psiquiatría", label: "Salud Mental / Psiquiatría" },
    { value: "Pabellón Quirúrgico", label: "Pabellón Quirúrgico" },
    { value: "Esterilización", label: "Esterilización" },
    { value: "Laboratorio Clínico", label: "Laboratorio Clínico" },
    { value: "Imagenología", label: "Imagenología" },
    { value: "Farmacia", label: "Farmacia" },
    { value: "Kinesiología / Rehabilitación", label: "Kinesiología / Rehabilitación" },
    { value: "Neonatología", label: "Neonatología" },
    { value: "Oncología", label: "Oncología" },
    { value: "Dermatología", label: "Dermatología" },
];

type UserFormData = Partial<Omit<Usuario, 'id' | 'fechaCreacion' | 'estado'>> & {
    password?: string;
};

interface UserFormModalProps {
  usuario?: Usuario;
  children: React.ReactNode;
  isOpenProp?: boolean;
  onOpenChangeProp?: (open: boolean) => void;
}

export function UserFormModal({ usuario, children, isOpenProp, onOpenChangeProp }: UserFormModalProps) {
  const isEditing = !!usuario;
  const [internalIsOpen, setInternalIsOpen] = React.useState(false);
  const isOpen = isOpenProp !== undefined ? isOpenProp : internalIsOpen;
  const onOpenChange = onOpenChangeProp !== undefined ? onOpenChangeProp : setInternalIsOpen;

  const [step, setStep] = React.useState(1);
  const [formData, setFormData] = React.useState<UserFormData>({});

  React.useEffect(() => {
      if (isOpen) {
          if (isEditing && usuario) {
              setFormData({
                  nombre: usuario.nombre,
                  correo: usuario.correo,
                  rol: usuario.rol,
                  entidadAsociada: usuario.entidadAsociada,
              });
              setStep(1);
          } else {
              setFormData({});
              setStep(1);
          }
      }
  }, [isOpen, isEditing, usuario]);


  const totalSteps = 4;

  const handleNext = () => {
      if (step === 1 && formData.rol === "Administrador RAD") {
          setStep(3);
      } else if (step < totalSteps) {
          setStep(step + 1);
      }
  };

  const handleBack = () => {
    if (step === 3 && formData.rol === "Administrador RAD") {
        setStep(1);
    } else if (step > 1) {
        setStep(step - 1);
    }
  };

  const updateFormData = (field: keyof UserFormData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    const finalUserData: Omit<Usuario, 'id' | 'fechaCreacion'> & { password?: string } = {
        nombre: formData.nombre ?? 'N/A',
        correo: formData.correo ?? 'N/A',
        rol: formData.rol ?? roles[0],
        entidadAsociada: formData.entidadAsociada ?? null,
        estado: isEditing ? (usuario?.estado ?? 'Activo') : "Activo",
        password: formData.password
    };
    console.log(`Submitting User Data (${isEditing ? 'Edit' : 'Create'}):`, finalUserData);
    alert(`Usuario ${isEditing ? 'editado' : 'creado'} (simulado). Revisa la consola.`);
    handleClose();
  };

  const handleClose = () => {
      onOpenChange(false);
  };

  const needsEntitySelection = formData.rol === "Coordinador CF" || formData.rol === "Encargado SC";

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      {!onOpenChangeProp && <DialogTrigger asChild>{children}</DialogTrigger>}
      
      <DialogContent className="sm:max-w-xl">
        <DialogHeader>
          <DialogTitle>
            {isEditing ? "Editar Usuario" : "Crear Nuevo Usuario"} (Paso {step} de {totalSteps})
          </DialogTitle>
          <DialogDescription>
             {/* Descriptions remain the same */}
             {step === 1 && "Seleccione el rol principal del usuario."}
             {step === 2 && needsEntitySelection && `Asigne el ${formData.rol === "Coordinador CF" ? "Centro Formador" : "Servicio Clínico"} correspondiente.`}
             {step === 3 && "Ingrese los detalles y credenciales del usuario."}
             {step === 4 && "Revise la información antes de guardar los cambios."}
          </DialogDescription>
        </DialogHeader>
        
        <div className="py-4 space-y-4 min-h-[250px]">
             {step === 1 && (
                <div className="space-y-2">
                    <Label htmlFor="rol">Rol del Usuario</Label>
                    <Select 
                        value={formData.rol} 
                        onValueChange={(value: UserRole) => {
                            updateFormData('rol', value);
                            if(isEditing && (value === 'Administrador RAD')) {
                                updateFormData('entidadAsociada', null);
                            }
                        }}
                    >
                        <SelectTrigger id="rol">
                            <SelectValue placeholder="Seleccione un rol..." />
                        </SelectTrigger>
                        <SelectContent>
                            {roles.map((r) => <SelectItem key={r} value={r}>{r}</SelectItem>)}
                        </SelectContent>
                    </Select>
                </div>
            )}

            {step === 2 && needsEntitySelection && (
                 <div className="space-y-2">
                    <Label htmlFor="entidad">
                        {formData.rol === "Coordinador CF" ? "Centro Formador" : "Servicio Clínico"}
                    </Label>
                    <Combobox
                        options={formData.rol === "Coordinador CF" ? centrosFormadores : serviciosClinicos}
                        value={formData.entidadAsociada ?? ""}
                        onChange={(value) => updateFormData('entidadAsociada', value)}
                        placeholder={`Seleccione ${formData.rol === "Coordinador CF" ? "centro..." : "servicio..."}`}
                        searchPlaceholder={`Buscar ${formData.rol === "Coordinador CF" ? "centro..." : "servicio..."}`}
                    />
                 </div>
            )}

            {step === 3 && (
                <div className="space-y-4">
                     <div className="space-y-2">
                        <Label htmlFor="nombre">Nombre Completo</Label>
                        <Input 
                            id="nombre" 
                            value={formData.nombre ?? ""}
                            onChange={(e) => updateFormData('nombre', e.target.value)} 
                            placeholder="Ej: Juan Pérez"
                        />
                     </div>
                     <div className="space-y-2">
                        <Label htmlFor="correo">Correo Electrónico</Label>
                        <Input 
                            id="correo" 
                            type="email" 
                            value={formData.correo ?? ""}
                            onChange={(e) => updateFormData('correo', e.target.value)} 
                            placeholder="Ej: juan.perez@ejemplo.com"
                            // disabled={isEditing} 
                        />
                     </div>
                     {!isEditing && (
                        <div className="space-y-2">
                            <Label htmlFor="password">Contraseña Inicial (Opcional)</Label>
                            <Input 
                                id="password" 
                                type="password" 
                                value={formData.password ?? ""}
                                onChange={(e) => updateFormData('password', e.target.value)}
                                placeholder="Dejar en blanco para generar/enviar link"
                            />
                        </div>
                     )}
                     {isEditing && (
                        <p className="text-xs text-muted-foreground">La gestión de contraseñas (reseteo) se maneja por separado.</p>
                     )}
                </div>
            )}

            {step === 4 && (
                 <div className="space-y-4 text-sm">
                    <h4 className="font-semibold mb-3">Resumen del Usuario</h4>
                    <div className="grid grid-cols-2 gap-y-2 gap-x-4 p-4 border rounded-md bg-muted/50">
                        <div><strong className="text-muted-foreground">Rol:</strong></div>
                        <div>{formData.rol}</div>

                        {needsEntitySelection && (
                            <>
                                <div><strong className="text-muted-foreground">
                                    {formData.rol === "Coordinador CF" ? "Centro:" : "Servicio:"}
                                </strong></div>
                                <div>{formData.entidadAsociada || 'N/A'}</div>
                            </>
                        )}
                        
                        <div><strong className="text-muted-foreground">Nombre:</strong></div>
                        <div>{formData.nombre || 'N/A'}</div>
                        
                        <div><strong className="text-muted-foreground">Correo:</strong></div>
                        <div>{formData.correo || 'N/A'}</div>

                         {!isEditing && (
                           <>
                              <div><strong className="text-muted-foreground">Contraseña:</strong></div>
                              <div>{formData.password ? 'Definida' : 'Se generará/enviará'}</div>
                           </>
                         )}
                    </div>
                    <p className="text-xs text-muted-foreground pt-2">Revise la información antes de guardar los cambios.</p>
                </div>
            )}
        </div>
        
        <DialogFooter className="flex flex-col-reverse sm:flex-row sm:justify-between w-full">
            {step > 1 ? (
                <Button variant="outline" onClick={handleBack}>
                    <ArrowLeft className="mr-2 h-4 w-4" /> Anterior
                </Button>
            ) : ( <div></div> )}

            {step < totalSteps ? (
                <Button onClick={handleNext} disabled={(step === 1 && !formData.rol) || (step === 2 && needsEntitySelection && !formData.entidadAsociada) || (step === 3 && (!formData.nombre || !formData.correo))}>
                    Siguiente
                </Button>
            ) : (
                <Button onClick={handleSubmit}>
                    {isEditing ? "Guardar Cambios" : "Crear Usuario"} <Send className="ml-2 h-4 w-4" />
                </Button>
            )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}