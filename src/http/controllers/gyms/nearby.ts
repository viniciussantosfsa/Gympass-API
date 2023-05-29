/* eslint-disable prettier/prettier */
import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { makeFetchNearbyGymsUseCase } from '@/user-cases/factories/make-fetch-nearby-gyms-use-case'

export async function nearby(request: FastifyRequest, reply: FastifyReply): Promise<void> {
    const nearbyGymsQuerySchema = z.object({
        latitude: z.number().refine(value => { return Math.abs(value) <= 90 }),
        longitude: z.number().refine((value) => { return Math.abs(value) <= 180 })
    })

    const { latitude, longitude } = nearbyGymsQuerySchema.parse(request.query)

    const fetchNearbyUseCase = makeFetchNearbyGymsUseCase()

    const { gyms } = await fetchNearbyUseCase.execute({
        userLatitude: latitude,
        userLongitude: longitude
    })

    return reply.status(201).send({ gyms })
}