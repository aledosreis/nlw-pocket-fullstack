import { Button } from '@/components/ui/button'
import { InOrbitIcon } from '@/components/in-orbit-icon'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { useNavigate } from 'react-router-dom'
import { checkAuthUser } from '@/http/check-auth-user'
import { useEffect } from 'react'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { registerUser } from '@/http/register-user'
import { UserPlus } from 'lucide-react'

const registerForm = z.object({
  username: z.string().min(3, 'Mínimo de 3 caracteres'),
  email: z.string().email(),
  password: z.string(),
})

type RegisterForm = z.infer<typeof registerForm>


export function Register() {
  const navigate = useNavigate()
  const {register, handleSubmit} = useForm<RegisterForm>({
    resolver: zodResolver(registerForm),
  })

  useEffect(() => {
    const token = localStorage.getItem('@in.orbit/token')

    if (token) {
      checkAuthUser(token)
        .then(response => {
          navigate(`/${response.username}`)
        })
    }
  }, [])

  async function handleRegister(data: RegisterForm) {
    const {createdUser: { username }, token} = await registerUser({
      username: data.username,
      email: data.email,
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
          onSubmit={handleSubmit(handleRegister)}
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
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                placeholder="Email"
                {...register('email')}
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
            <Button className="flex flex-1 gap-3 items-center">
              <UserPlus className='size-4' />
              Cadastrar
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
