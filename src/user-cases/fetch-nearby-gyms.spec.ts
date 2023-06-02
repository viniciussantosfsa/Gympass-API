import { it, describe, expect, beforeEach } from 'vitest'
import { InMemoryGymsRepository } from '../repositories/in-memory/in-memory-gyms-repo'
import { FetchNearbyUseCase } from './fetch-nearby-gyms'

let gymsRepository: InMemoryGymsRepository
let sut: FetchNearbyUseCase

describe('Fetch Nearby Use Case', () => {
  beforeEach(() => {
    gymsRepository = new InMemoryGymsRepository()
    sut = new FetchNearbyUseCase(gymsRepository)
  })

  it('should be able to fetch nearby gyms', async () => {

    await gymsRepository.create({
        title: 'Near Gym',
        description: null,
        phone: null,
        latitude: -12.2303138,
        longitude: -38.9405758,
    })

    await gymsRepository.create({
        title: 'Far Gym',
        description: null,
        phone: null,
        latitude: -12.6081002,
        longitude: -38.8307256,
    })

    const { gyms } = await sut.execute({
        userLatitude: -12.2275884,
        userLongitude: -38.941313,
    })

    expect(gyms).toHaveLength(1)
    expect(gyms).toEqual([expect.objectContaining({ title: 'Near Gym' })])
  })
})
