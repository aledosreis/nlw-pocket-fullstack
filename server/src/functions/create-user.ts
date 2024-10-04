import { eq } from 'drizzle-orm'
import { db } from '../db'
import { users } from '../db/schema'
import bcrypt from 'bcrypt'

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

  const salt = await bcrypt.genSalt(12)
  const hashPassword = await bcrypt.hash(password, salt)

  const result = await db
    .insert(users)
    .values({
      username,
      email,
      password: hashPassword,
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
