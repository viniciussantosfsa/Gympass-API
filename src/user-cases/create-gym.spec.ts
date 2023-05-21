/* eslint-disable prettier/prettier */
import { it, describe, expect, beforeEach } from 'vitest'
import { CreateGymUseCase } from './create-gym'
import { InMemoryGymRepository } from '@/repositories/in-memory/in-memory-gym-repo'

let gymsRepository: InMemoryGymRepository
let sut: CreateGymUseCase

describe('Register Use case', () => {
  beforeEach(() => {
    gymsRepository = new InMemoryGymRepository()
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
