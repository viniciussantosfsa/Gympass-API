/* eslint-disable prettier/prettier */
import { it, describe, expect, beforeEach, afterEach, vi } from 'vitest'
import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repo'
import { ValidateCheckInUseCase } from './validate-check-in'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

let checkInsRepository: InMemoryCheckInsRepository
let sut: ValidateCheckInUseCase

describe('Validate Check-in Use case', () => {
    afterEach(() => {
        vi.useRealTimers()
    })

    beforeEach(async () => {
        checkInsRepository = new InMemoryCheckInsRepository()
        sut = new ValidateCheckInUseCase(checkInsRepository)
        vi.useFakeTimers()
    })

    it('should be able to validate the check-in', async () => {
        const createdCheckIn = await checkInsRepository.create({
            gym_id: 'gym-01',
            user_id: 'user-01'
        })

        const { checkIn } = await sut.execute({
            checkInId: createdCheckIn.id
        })

        expect(checkIn.validated_at).toEqual(expect.any(Date))
        expect(checkInsRepository.items[0].validated_at).toEqual(expect.any(Date))
    })

    it('should not be able to validate an inexistent check-in', async () => {
        await expect(() => sut.execute({
            checkInId: 'inexistent-check-in-id'
        }),
        ).rejects.toBeInstanceOf(ResourceNotFoundError)
    })

    it('should not be able to validate the check-in after 20min of its creation', async () => {
        vi.setSystemTime(new Date(2032, 0, 1, 13, 40))

        const createdCheckIn = await checkInsRepository.create({
            gym_id: 'gym-01',
            user_id: 'user-01'
        })

        const twentyOneMinutesInMs: number = 1000 * 60 * 21

        vi.advanceTimersByTime(twentyOneMinutesInMs)

        await expect(() => sut.execute({
            checkInId: createdCheckIn.id,
        }),
        ).rejects.toBeInstanceOf(Error)
    })
})
