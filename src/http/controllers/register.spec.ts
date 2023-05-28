/* eslint-disable prettier/prettier */
import request from 'supertest'
import { app } from '@/app'
import { describe, it, expect, beforeAll, afterAll } from 'vitest'


describe('register (e2e)', () => {

    beforeAll(async () => {
        await app.ready()
    })

    afterAll(async () => {
        await app.close()
    })

    it('should be able to register', async () => {
        const response = await request(app.server)
            .post('/users')
            .send({
                name: 'John Doe',
                email: 'johndoe12141@gmail.com',
                password: '123456'
            })

        expect(response.statusCode).toEqual(201)
    })
})