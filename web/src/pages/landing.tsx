import { InOrbitIcon } from "@/components/in-orbit-icon";
import { checkAuthUser } from "@/http/check-auth-user";
import { LogIn, UserPlus } from "lucide-react";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

export function Landing() {
  const navigate = useNavigate()

  useEffect(() => {
    const token = localStorage.getItem('@in.orbit/token')

    if (token) {
      checkAuthUser(token)
        .then(response => {
          navigate(`/${response.username}`)
        })
    }
  }, [])
  
  return (
    <div className="h-screen w-screen flex items-center">
      <div className="flex justify-between w-full h-full p-10">
        <div className="flex flex-1 justify-center items-center flex-col gap-6">
          <div className="flex gap-3 items-center">
            <InOrbitIcon />
            <span className="text-2xl font-semibold">in.Orbit</span>
          </div>

          <span className="text-lg font-medium">Registre e controle suas metas semanais</span>
        </div>

        <div className="flex flex-col gap-4 flex-1 items-center justify-center">
          <Link to='/login' className="flex items-center justify-center gap-2 rounded-lg text-sm font-medium tracking-tight outline-none ring-offset-2 ring-offset-black focus-visible:ring-2 bg-violet-500 text-violet-50 hover:bg-violet-600 ring-violet-500 px-4 py-2.5">
            <LogIn className="size-4" />
            Faça seu login
          </Link>
          <span className="text-zinc-400 text-sm">-- OU --</span>
          <Link to='/register' className="flex items-center justify-center gap-2 rounded-lg text-sm font-medium tracking-tight outline-none ring-offset-2 ring-offset-black focus-visible:ring-2 bg-violet-500 text-violet-50 hover:bg-violet-600 ring-violet-500 px-4 py-2.5">
            <UserPlus className="size-4" />
            Cadastre-se
          </Link>
        </div>
      </div>
    </div>
  )
}