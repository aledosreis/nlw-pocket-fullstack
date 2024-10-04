import type {
  FastifyReply,
  FastifyRequest,
  HookHandlerDoneFunction,
} from 'fastify'
import jwt from 'jsonwebtoken'
import { env } from '../env'

export async function middleware(request: FastifyRequest, reply: FastifyReply) {
  const rawToken = request.headers.authorization
  const token = rawToken?.split('Bearer ')[1]

  if (!token) {
    return reply.status(401).send({ message: 'Invalid token' })
  }

  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  const payload = jwt.verify(token, env.JWT_SECRET) as any
  console.log(payload)
  if (!payload) {
    return reply.status(401).send({ message: 'Invalid token' })
  }

  request.params = {
    connectedUserId: payload.id,
  }
}
