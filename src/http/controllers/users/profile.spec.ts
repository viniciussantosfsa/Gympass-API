import request from 'supertest'
import { app } from '@/app'
import { describe, it, expect, beforeAll, afterAll } from 'vitest'
import { generateRandomDigits } from '@/utils/test/generators'


describe('profile (e2e)', () => {
    let randomDigits = '1234'

    beforeAll(async () => {
        await app.ready()
        randomDigits = await generateRandomDigits(request)
    })

    afterAll(async () => {
        await app.close()
    })

    it('should be able to get user profile', async () => {
        await request(app.server)
            .post('/users')
            .send({
                name: 'John Doe',
                email: `${randomDigits}@example.com`,
                password: '123456'
            })

        const response = await request(app.server)
            .post('/sessions')
            .send({
                email: `${randomDigits}@example.com`,
                password: '123456',
            })

        const profileResponse = await request(app.server)
            .get('/me')
            .set('Authorization', `Bearer ${response.body.token}`)
            .send()

        expect(profileResponse.statusCode).toBe(200)
        expect(profileResponse.body.user).toEqual(
            expect.objectContaining({
                email: `${randomDigits}@example.com`,
            })
        )
    })
})