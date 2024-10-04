type PendingGoalsResponse = {
  id: string
  title: string
  desiredWeeklyFrequency: number
  completionCount: number
}[]

type PendingGoalsProps = {
  userId: string
}

export async function getPendingGoals({
  userId,
}: PendingGoalsProps): Promise<PendingGoalsResponse> {
  const response = await fetch(`http://localhost:3333/pending-goals/${userId}`)
  const data = await response.json()

  return data.pendingGoals
}
