import { useQuery } from '@tanstack/react-query'
import { Dialog } from '@/components/ui/dialog'
import { CreateGoal } from '@/components/create-goal'
import { Summary } from '@/components/summary'
import { EmptyGoals } from '@/components/empty-goals'
import { getSummary } from '@/http/get-summary'

export function Goals() {
  const { data } = useQuery({
    queryKey: ['summary'],
    queryFn: () => getSummary({ userId: 'swnz0ye4cgk1jjta585vbi1p' }),
    staleTime: 1000 * 60, // 60 sec
  })

  return (
    <Dialog>
      {data?.total && data.total > 0 ? <Summary /> : <EmptyGoals />}

      <CreateGoal />
    </Dialog>
  )
}
