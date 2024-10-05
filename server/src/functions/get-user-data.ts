import { eq } from 'drizzle-orm'
import { db } from '../db'
import { users } from '../db/schema'

interface GetWeekSummaryRequest {
  username: string
}

export async function getUserData({ username }: GetWeekSummaryRequest) {

  const result = await db
    .select({
      id: users.id,
      email: users.email,
      username: users.username,
      createdAt: users.createdAt
    })
    .from(users)
    .where(eq(users.username, username))

  return {
    userData: result[0],
  }
}
