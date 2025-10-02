import { LoginForm } from "@/app/autenticacion/login/_components/login-form"
import { ModeToggle } from "@/components/mode-toggler"

export default function LoginPage() {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center p-6 md:p-10">
      <ModeToggle />
      <div className="w-full max-w-sm md:max-w-3xl">
        <LoginForm />
      </div>
    </div>
  )
}
