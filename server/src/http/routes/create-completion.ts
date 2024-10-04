import { z } from 'zod'
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { createGoalCompletion } from '../../functions/create-goal-completion'
import { middleware } from '../../functions/middleware'

export const createCompletionRoute: FastifyPluginAsyncZod = async app => {
  app.post(
    '/completions',
    {
      preHandler: middleware,
      schema: {
        body: z.object({
          goalId: z.string(),
        }),
      },
    },
    async request => {
      const { goalId } = request.body
      // biome-ignore lint/suspicious/noExplicitAny: <explanation>
      const { connectedUserId } = request.params as any

      const { userId, goalCompletion } = await createGoalCompletion({
        goalId,
        connectedUserId,
      })

      return {
        goalCompletion,
        userId,
      }
    }
  )
}
