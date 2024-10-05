import { useQuery } from '@tanstack/react-query'
import { Dialog } from '@/components/ui/dialog'
import { CreateGoal } from '@/components/create-goal'
import { Summary } from '@/components/summary'
import { EmptyGoals } from '@/components/empty-goals'
import { getSummary } from '@/http/get-summary'
import { useParams } from 'react-router-dom'
import { getUserData } from '@/http/get-user-data'

export function Goals() {
  const { username } = useParams()

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

  return (
    <Dialog>
      {data?.total && data.total > 0 ? <Summary /> : <EmptyGoals />}

      <CreateGoal />
    </Dialog>
  )
}
