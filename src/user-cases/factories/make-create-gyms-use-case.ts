import { CreateGymUseCase } from '../create-gym'
import { PrismaGymsRepository } from '@/repositories/prisma/prisma-gyms-repo'

export function makeCreateGymUseCase() {
  const gymsRepository = new PrismaGymsRepository()
  const createGym = new CreateGymUseCase(gymsRepository)

  return createGym
}