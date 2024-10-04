import { db } from '../db'
import { goals } from '../db/schema'

interface CreateGoalRequest {
  title: string
  desiredWeeklyFrequency: number
  connectedUserId: string
}

export async function createGoal({
  title,
  desiredWeeklyFrequency,
  connectedUserId,
}: CreateGoalRequest) {
  const result = await db
    .insert(goals)
    .values({
      title,
      desiredWeeklyFrequency,
      userId: connectedUserId,
    })
    .returning()

  const goal = result[0]

  return {
    goal,
  }
}
