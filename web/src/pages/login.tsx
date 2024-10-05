import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@/components/ui/button'
import { InOrbitIcon } from '@/components/in-orbit-icon'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { authenticateUser } from '@/http/authenticate-user'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'

const loginForm = z.object({
  username: z.string(),
  password: z.string(),
})

type LoginForm = z.infer<typeof loginForm>

export function Login() {
  const navigate = useNavigate()
  const {register, handleSubmit} = useForm<LoginForm>({
    resolver: zodResolver(loginForm),
  })

  useEffect(() => {
    const token = localStorage.getItem('@in.orbit/token')

    if (token) {
      // Buscar informação do usuario logado
      // navigate('')
      console.log('Autenticado')
    }
  }, [])

  async function handleLogin(data: LoginForm) {
    const {authenticatedUser: { username }, token} = await authenticateUser({
      username: data.username,
      password: data.password,
    })

    localStorage.setItem('@in.orbit/token', token)

    navigate(`/${username}`)
  }

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="py-10 max-w-[480px] w-full flex flex-col gap-6">
        <div className="flex items-center gap-3">
          <InOrbitIcon />
          <span className="text-lg font-semibold">in.Orbit</span>
        </div>

        <form
          onSubmit={handleSubmit(handleLogin)}
          className="flex-1 flex flex-col gap-6 justify-between"
        >
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                autoFocus
                placeholder="Username"
                {...register('username')}
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                placeholder="Password"
                type="password"
                {...register('password')}
              />
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Button className="flex-1">Login</Button>
          </div>
        </form>
      </div>
    </div>
  )
}
