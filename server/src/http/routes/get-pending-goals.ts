import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { getWeekPengingGoals } from '../../functions/get-week-pending-goals'
import z from 'zod'

export const getPendingGoalsRoute: FastifyPluginAsyncZod = async app => {
  app.get(
    '/pending-goals/:userId',
    {
      schema: {
        params: z.object({
          userId: z.string(),
        }),
      },
    },
    async request => {
      const { userId } = request.params
      const { pendingGoals } = await getWeekPengingGoals({ userId })

      return { pendingGoals }
    }
  )
}
