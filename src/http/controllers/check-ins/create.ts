/* eslint-disable prettier/prettier */
import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { makeCheckInUseCase } from '@/user-cases/factories/make-check-in-use-case'

export async function create(request: FastifyRequest, reply: FastifyReply): Promise<void> {
    const createCheckInParamsSchema = z.object({
        gymId: z.string().uuid()
    })
    const createCheckInBodySchema = z.object({
        latitude: z.number().refine((value) => { return Math.abs(value) <= 90 }),
        longitude: z.number().refine((value) => { return Math.abs(value) <= 180 })
    })

    const { gymId } = createCheckInParamsSchema.parse(request.params)
    const { latitude, longitude } = createCheckInBodySchema.parse(request.body)

    const checkInUseCase = makeCheckInUseCase()

    await checkInUseCase.execute({
        gymId,
        userId: request.user.sub,
        userLatitude: latitude,
        userLongitude: longitude
    })

    return reply.status(201).send()
}
