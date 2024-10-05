interface CreateGoalRequest {
  title: string
  desiredWeeklyFrequency: number
  token: string
}

export async function createGoal({
  title,
  desiredWeeklyFrequency,
  token
}: CreateGoalRequest) {
  await fetch('http://localhost:3333/goals', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({
      title,
      desiredWeeklyFrequency,
    }),
  })
}
