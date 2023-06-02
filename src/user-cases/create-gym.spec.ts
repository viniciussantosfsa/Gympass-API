import { it, describe, expect, beforeEach } from 'vitest'
import { CreateGymUseCase } from './create-gym'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repo'

let gymsRepository: InMemoryGymsRepository
let sut: CreateGymUseCase

describe('Register Use case', () => {
  beforeEach(() => {
    gymsRepository = new InMemoryGymsRepository()
    sut = new CreateGymUseCase(gymsRepository)
  })

  it('should be able to create gym', async () => {
    const { gym } = await sut.execute({
        title: 'Javascript',
        description: null,
        phone: null,
        latitude: -12.134901,
        longitude: -32.934772,
    })

    expect(gym.id).toEqual(expect.any(String))
  })
})
