import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { getUserData } from '../../functions/get-user-data'
import { middleware } from '../../functions/middleware'
import { db } from '../../db'
import { users } from '../../db/schema'
import { eq } from 'drizzle-orm'

export const checkAuthUserRoute: FastifyPluginAsyncZod = async app => {
  app.get(
    '/auth/checkAuthUser',
    {
      preHandler: middleware,
    },
    async request => {
      const { connectedUserId } = request.params as any

      const result = await db
        .select({
          id: users.id,
          username: users.username,
          email: users.email,
          createdAt: users.createdAt
        })
        .from(users)
        .where(eq(users.id, connectedUserId))

      const userData = result[0]

      return { userData }
    }
  )
}
