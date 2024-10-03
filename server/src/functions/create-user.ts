import { db } from "../db"
import { users } from "../db/schema"

interface CreateUserRequest {
  username: string
  email: string
  password: string
}

export async function createUser({
  username,
  email,
  password
}: CreateUserRequest) {
  const result = await db
    .insert(users)
    .values({
      username,
      email,
      password
    })
    .returning()

    const createdUser = result[0]

    return {
      createdUser: {
        username: createdUser.email,
        email: createdUser.email,
        createdAt: createdUser.createdAt,
      }
    }
}