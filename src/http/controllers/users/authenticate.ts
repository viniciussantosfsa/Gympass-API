import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { InvalidCredentialsError } from '@/user-cases/errors/invalid-credentials-erros'
import { makeAuthenticateUseCase } from '@/user-cases/factories/make-authenticate-use-case'

export async function authenticate(request: FastifyRequest, reply: FastifyReply): Promise<void> {
  const authenticateBodySchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
  })

  const { email, password } = authenticateBodySchema.parse(request.body)

  try {
    const authenticateUseCase = makeAuthenticateUseCase()

    const { user } = await authenticateUseCase.execute({
      email,
      password
    })

    const token = await reply.jwtSign(
      {}, {
      sign: {
        sub: user.id
      }
    })

    const refreshToken = await reply.jwtSign(
      {}, {
      sign: {
        sub: user.id,
        expiresIn: '7d',
      }
    })

    return reply
      .setCookie('refreshToken', refreshToken, {
        path: '/', // Todas as rotas do backend podem acessar, somente.
        secure: true, 
        sameSite: true, 
        httpOnly: true,
      })
      .status(200)
      .send({ token })

  } catch (err) {
    if (err instanceof InvalidCredentialsError) {
      return reply.status(400).send({ message: err.message })
    }
    throw err
  }
}
