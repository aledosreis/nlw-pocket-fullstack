import { eq } from 'drizzle-orm'
import { db } from '../db'
import { users } from '../db/schema'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { env } from '../env'

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
  const isPasswordCorrect = await bcrypt.compare(password, user.password)

  if (!isPasswordCorrect) {
    return {
      error: 'Wrong password',
    }
  }

  const token = jwt.sign({ id: user.id }, env.JWT_SECRET)

  return {
    authenticatedUser: {
      username: user.username,
      email: user.email,
    },
    token,
  }
}
