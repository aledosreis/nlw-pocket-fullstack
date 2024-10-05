import { Plus } from 'lucide-react'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { OutlineButton } from './ui/outline-button'
import { getPendingGoals } from '@/http/get-pending-goals'
import { createGoalCompletion } from '@/http/create-goal-completion'
import { useParams } from 'react-router-dom'
import { getUserData } from '@/http/get-user-data'

export function PendingGoals() {
  const queryClient = useQueryClient()

  const { username } = useParams()

  const { data: userData } = useQuery({
    queryKey: ['userData'],
    queryFn: () => getUserData({ username: username! }),
    staleTime: 1000 * 60, // 60 sec
  })

  const { data } = useQuery({
    queryKey: ['pending-goals'],
    queryFn: () => getPendingGoals({ userId: userData!.id }),
    staleTime: 1000 * 60, // 60 sec
  })

  if (!data) {
    return null
  }

  async function handleCompleteGoal(goalId: string) {
    const token = localStorage.getItem('@in.orbit/token')
    await createGoalCompletion(goalId, token!)

    queryClient.invalidateQueries({ queryKey: ['summary'] })
    queryClient.invalidateQueries({ queryKey: ['pending-goals'] })
  }

  return (
    <div className="flex flex-wrap gap-3">
      {data.map(goal => {
        return (
          <OutlineButton
            key={goal.id}
            disabled={goal.completionCount >= goal.desiredWeeklyFrequency}
            onClick={() => handleCompleteGoal(goal.id)}
          >
            <Plus className="size-4 text-zinc-600" />
            {goal.title}
          </OutlineButton>
        )
      })}
    </div>
  )
}
