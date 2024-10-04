type SummaryResponse = {
  completed: number
  total: number
  goalsPerDay: Record<
    string,
    {
      id: string
      title: string
      completedAt: string
    }[]
  >
}

type GetSummaryProps = {
  userId: string
}

export async function getSummary({
  userId,
}: GetSummaryProps): Promise<SummaryResponse> {
  const response = await fetch(`http://localhost:3333/summary/${userId}`)
  const data = await response.json()

  return data.summary
}
