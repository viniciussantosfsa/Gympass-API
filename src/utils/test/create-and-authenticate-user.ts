/* eslint-disable prettier/prettier */
import { FastifyInstance } from 'fastify'
import request from 'supertest'
import { generateRandomDigits } from './generators'
import { prisma } from '@/lib/prisma'
import { hash } from 'bcryptjs'

export async function createAndAuthenticateUser(
    app: FastifyInstance,
    isAdmin = false
) {
    const randomDigits = await generateRandomDigits(request)

    const user = await prisma.user.create({
        data: {
            name: 'John doe',
            email: `${randomDigits}@example.com`,
            password_hash: await hash('123456', 6),
            role: isAdmin ? 'ADMIN' : 'MEMBER'
        }
    })

    const authResponse = await request(app.server)
        .post('/sessions')
        .send({
            email: `${randomDigits}@example.com`,
            password: '123456',
        })

    const { token } = authResponse.body

    return { token, user }
}
