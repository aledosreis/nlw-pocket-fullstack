import { z } from 'zod'
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { createUser } from '../../functions/create-user'

export const createUserRoute: FastifyPluginAsyncZod = async app => {
  app.post(
    '/register',
    {
      schema: {
        body: z.object({
          username: z.string(),
          email: z.string(),
          password: z.string(),
        }),
      },
    },
    async request => {
      const { username, email, password } = request.body

      const { token, createdUser, error } = await createUser({
        username,
        email,
        password,
      })

      if (error) {
        return { error }
      }

      return {
        createdUser,
        token,
      }
    }
  )
}
