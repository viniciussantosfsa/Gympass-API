import { SearchGymsUseCase } from '../search-gyms'
import { PrismaGymsRepository } from '@/repositories/prisma/prisma-gyms-repo'

export function makeSearchGymsUseCase() {
  const gymsRepository = new PrismaGymsRepository()
  const searchGyms = new SearchGymsUseCase(gymsRepository)

  return searchGyms
}