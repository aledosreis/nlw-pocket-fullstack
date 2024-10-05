import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { getUserData } from '../../functions/get-user-data'
import z from 'zod'

export const getUserDataRoute: FastifyPluginAsyncZod = async app => {
  app.get(
    '/profile/:username',
    {
      schema: {
        params: z.object({
          username: z.string(),
        }),
      },
    },
    async request => {
      const { username } = request.params
      const { userData } = await getUserData({ username })

      return { userData }
    }
  )
}
