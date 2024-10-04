import { eq } from 'drizzle-orm'
import { db } from '../db'
import { users } from '../db/schema'

interface CreateUserRequest {
  username: string
  email: string
  password: string
}

export async function createUser({
  username,
  email,
  password,
}: CreateUserRequest) {
  const usernameAlreadyRegistered = await db
    .select({
      id: users.id,
      username: users.username,
      email: users.email,
      createdAt: users.createdAt,
    })
    .from(users)
    .where(eq(users.username, username))

  if (usernameAlreadyRegistered.length > 0) {
    return {
      error: 'Username already registered.',
    }
  }

  const emailAlreadyRegistered = await db
    .select({
      id: users.id,
      username: users.username,
      email: users.email,
      createdAt: users.createdAt,
    })
    .from(users)
    .where(eq(users.email, email))

  if (emailAlreadyRegistered.length > 0) {
    return {
      error: 'Email already registered.',
    }
  }

  const result = await db
    .insert(users)
    .values({
      username,
      email,
      password,
    })
    .returning()

  const createdUser = result[0]

  return {
    createdUser: {
      username: createdUser.username,
      email: createdUser.email,
      createdAt: createdUser.createdAt,
    },
  }
}
