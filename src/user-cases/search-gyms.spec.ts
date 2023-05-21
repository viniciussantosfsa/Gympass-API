/* eslint-disable prettier/prettier */
import { it, describe, expect, beforeEach } from 'vitest'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repo'
import { SearchGymsUseCase } from './search-gyms'

let gymsRepository: InMemoryGymsRepository
let sut: SearchGymsUseCase

describe('Search Gyms Use Case', () => {
  beforeEach(() => {
    gymsRepository = new InMemoryGymsRepository()
    sut = new SearchGymsUseCase(gymsRepository)
  })

  it('should be able to search for gyms', async () => {
    await gymsRepository.create({
        title: 'JavaScript Gym',
        description: null,
        phone: null,
        latitude: -12.134901,
        longitude: -32.934772,
    })

    await gymsRepository.create({
        title: 'TypeScript Gym',
        description: null,
        phone: null,
        latitude: -12.134901,
        longitude: -32.934772,
    })

    //     all gyms
    const { gym } = await sut.execute({
        query: 'JavaScript',
        page: 1,
    })

    expect(gym).toHaveLength(1)
    expect(gym).toEqual([expect.objectContaining({ title: 'JavaScript Gym' })

    ])
  })

  it('should be able to fetch paginated gyms search', async () => {
    for (let i = 1; i <= 22; i++) {
        await gymsRepository.create({
            title: `JavaScript Gym ${i}`,
            description: null,
            phone: null,
            latitude: -12.134901,
            longitude: -32.934772,
        })
    }

    const { gym } = await sut.execute({
        query: 'JavaScript',
        page: 2
    })

    expect(gym).toHaveLength(2)
    expect(gym).toEqual([
      expect.objectContaining({ title: 'JavaScript Gym 21' }),
      expect.objectContaining({ title: 'JavaScript Gym 22' })
    ])
  })
})
