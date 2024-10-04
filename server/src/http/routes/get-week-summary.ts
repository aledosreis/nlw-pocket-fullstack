import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { getWeekSummary } from '../../functions/get-week-summary'
import z from 'zod'

export const getWeekSummaryRoute: FastifyPluginAsyncZod = async app => {
  app.get(
    '/summary/:userId',
    {
      schema: {
        params: z.object({
          userId: z.string(),
        }),
      },
    },
    async request => {
      const { userId } = request.params
      const { summary } = await getWeekSummary({ userId })

      return { summary }
    }
  )
}
