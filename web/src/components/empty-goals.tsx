import logo from '@/assets/logo-in-orbit.svg'
import letsStart from '@/assets/lets-start-illustration.svg'
import { DialogTrigger } from './ui/dialog'
import { Button } from './ui/button'
import { LogOut, Plus } from 'lucide-react'
import { getUserData } from '@/http/get-user-data'
import { useQuery } from '@tanstack/react-query'
import { useParams, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { checkAuthUser } from '@/http/check-auth-user'

export function EmptyGoals() {
  const { username } = useParams()
  const navigate = useNavigate()
  const [connectedUser, setConnectedUser] = useState()

  useEffect(() => {
    const token = localStorage.getItem('@in.orbit/token')

    if (token) {
      checkAuthUser(token)
        .then(response => setConnectedUser(response))
    }
  }, [])

  function handleLogout() {
    localStorage.removeItem('@in.orbit/token')
    navigate('/')
  }

  const { data: userData } = useQuery({
    queryKey: ['userData'],
    queryFn: () => getUserData({ username: username! }),
    staleTime: 1000 * 60, // 60 sec
  })
  
  return (
    <div className='w-screen'>
      <div className='px-10 pt-4 flex justify-between items-center absolute w-full'>
        <span className='text-lg font-semibold'>
          {userData?.username}{' '}
          <span className='text-base font-normal text-zinc-400'>({userData?.email})</span>
        </span>
        {connectedUser && (
        <Button size='sm' onClick={handleLogout}>
          <LogOut className='size-4' />
          Sair
        </Button>)}
      </div>
      <div className="h-screen flex flex-col items-center justify-center gap-8">
        <img src={logo} alt="in.orbit" />
        <img src={letsStart} alt="lets start" />
        <p className="text-zinc-300 leading-relaxed max-w-80 text-center">
          Você ainda não cadastrou nenhuma meta, que tal cadastrar um agora mesmo?
        </p>

        {
          connectedUser?.username === userData?.username &&
          (<DialogTrigger asChild>
            <Button>
              <Plus className="size-4" />
              Cadastrar meta
            </Button>
          </DialogTrigger>)
        }
      </div>
    </div>
  )
}
