import { z } from 'zod'
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { createGoal } from '../../functions/create-goal'
import { middleware } from '../../functions/middleware'

export const createGoalRoute: FastifyPluginAsyncZod = async app => {
  app.post(
    '/goals',
    {
      preHandler: middleware,
      schema: {
        body: z.object({
          title: z.string(),
          desiredWeeklyFrequency: z.number().min(1).max(7),
        }),
      },
    },
    async request => {
      const { title, desiredWeeklyFrequency } = request.body
      // biome-ignore lint/suspicious/noExplicitAny: <explanation>
      const { connectedUserId } = request.params as any

      await createGoal({
        title,
        desiredWeeklyFrequency,
        connectedUserId,
      })
    }
  )
}
