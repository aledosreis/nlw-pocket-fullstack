export async function createGoalCompletion(goalId: string, token: string) {
  await fetch('http://localhost:3333/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({
      goalId,
    }),
  })
}
