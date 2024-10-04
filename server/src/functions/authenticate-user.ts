import { eq } from 'drizzle-orm'
import { db } from '../db'
import { users } from '../db/schema'

interface AuthenticateUserRequest {
  username: string
  password: string
}

export async function authenticateUser({
  username,
  password,
}: AuthenticateUserRequest) {
  const userResponse = await db
    .select({
      id: users.id,
      username: users.username,
      email: users.email,
      password: users.password,
      createdAt: users.createdAt,
    })
    .from(users)
    .where(eq(users.username, username))

  if (userResponse.length === 0) {
    return {
      error: 'User not found.',
    }
  }

  const user = userResponse[0]

  if (password !== user.password) {
    return {
      error: 'Wrong password',
    }
  }

  return {
    createdUser: {
      username: user.username,
      email: user.email,
      createdAt: user.createdAt,
    },
  }
}
