import { CheckCircle2, LogOut, Plus } from 'lucide-react'
import { useQuery } from '@tanstack/react-query'
import { Progress, ProgressIndicator } from './ui/progress-bar'
import { DialogTrigger } from './ui/dialog'
import { Button } from './ui/button'
import { Separator } from './ui/separator'
import { InOrbitIcon } from './in-orbit-icon'
import { getSummary } from '@/http/get-summary'
import dayjs from 'dayjs'
import ptBR from 'dayjs/locale/pt-br'
import { PendingGoals } from './pending-goals'
import { useNavigate, useParams } from 'react-router-dom'
import { getUserData } from '@/http/get-user-data'

dayjs.locale(ptBR)

export function Summary() {
  const { username } = useParams()
  const navigate = useNavigate()

  function handleLogout() {
    localStorage.removeItem('@in.orbit/token')
    navigate('/')
  }

  const { data: userData } = useQuery({
    queryKey: ['userData'],
    queryFn: () => getUserData({ username: username! }),
    staleTime: 1000 * 60, // 60 sec
  })

  const { data } = useQuery({
    queryKey: ['summary'],
    queryFn: () => getSummary({ userId: userData!.id }),
    staleTime: 1000 * 60, // 60 sec
  })

  if (!data) {
    return null
  }

  const firstDayOfWeek = dayjs().startOf('week').format('D MMM')
  const lastDayOfWeek = dayjs().endOf('week').format('D MMM')

  const completedPercentage = Math.round((data.completed * 100) / data.total)

  return (
    <div className='w-screen'>
      <div className='px-10 pt-4 flex justify-between items-center absolute w-full'>
        <span className='text-lg font-semibold'>
          {userData?.username}{' '}
          <span className='text-base font-normal text-zinc-400'>({userData?.email})</span>
        </span>
        <Button size='sm' onClick={handleLogout}>
          <LogOut className='size-4' />
          Sair
        </Button>
      </div>
      <div className="py-10 max-w-[480px] px-5 mx-auto flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <InOrbitIcon />
            <span className="text-lg font-semibold capitalize">
              {firstDayOfWeek} - {lastDayOfWeek}
            </span>
          </div>

          <DialogTrigger asChild>
            <Button size="sm">
              <Plus className="size-4" />
              Cadastrar meta
            </Button>
          </DialogTrigger>
        </div>

        <div className="flex flex-col gap-3">
          <Progress value={8} max={15}>
            <ProgressIndicator style={{ width: `${completedPercentage}%` }} />
          </Progress>

          <div className="flex items-center justify-between text-xs text-zinc-400">
            <span>
              Você completou{' '}
              <span className="text-zinc-100">{data?.completed}</span> de{' '}
              <span className="text-zinc-100">{data?.total}</span> metas nessa
              semana.
            </span>
            <span>{completedPercentage}%</span>
          </div>
        </div>

        <Separator />

        <PendingGoals />

        <div className="flex flex-col gap-6">
          <h2 className="text-xl font-medium">Sua semana</h2>

          {data.completed === 0 ? (
            <span className="text-sm text-zinc-400">
              Você ainda não completou nenhuma meta essa semana.
            </span>
          ) : null}

          {data.goalsPerDay &&
            Object.entries(data.goalsPerDay).map(([date, goals]) => {
              const weekDay = dayjs(date).format('dddd')
              const formattedDate = dayjs(date).format('D [de] MMMM')

              return (
                <div key={date} className="flex flex-col gap-4">
                  <h3 className="font-medium">
                    <span className="capitalize">{weekDay}</span>{' '}
                    <span className="text-zinc-400 text-xs">
                      ({formattedDate})
                    </span>
                  </h3>

                  <ul className="flex flex-col gap-3">
                    {goals.map(goal => {
                      const time = dayjs(goal.completedAt).format('HH:mm')

                      return (
                        <li key={goal.id} className="flex items-center gap-2">
                          <CheckCircle2 className="size-4 text-pink-500" />
                          <span className="text-sm text-zinc-400">
                            Você completou "
                            <span className="text-zinc-100 font-medium">
                              {goal.title}
                            </span>
                            " às{' '}
                            <span className="text-zinc-100 font-medium">
                              {time}h
                            </span>
                          </span>
                        </li>
                      )
                    })}
                  </ul>
                </div>
              )
            })}
        </div>
      </div>
    </div>
  )
}
