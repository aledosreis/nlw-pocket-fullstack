import { z } from 'zod'
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { authenticateUser } from '../../functions/authenticate-user'

export const authenticateUserRoute: FastifyPluginAsyncZod = async app => {
  app.post(
    '/signIn',
    {
      schema: {
        body: z.object({
          username: z.string(),
          password: z.string(),
        }),
      },
    },
    async request => {
      const { username, password } = request.body

      const { error } = await authenticateUser({
        username,
        password,
      })

      if (error) {
        return { error }
      }
    }
  )
}
