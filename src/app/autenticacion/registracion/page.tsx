import { ModeToggle } from "@/components/mode-toggler"
import { FormularioRegistracion } from "./_components/form-registracion"

export default function RegistracionRoutes() {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center p-6 md:p-10">
      <div className="absolute left-4 top-4">
        <ModeToggle />
      </div>
      <div className="w-full max-w-lg">
        <FormularioRegistracion />
      </div>
    </div>
  )
}
