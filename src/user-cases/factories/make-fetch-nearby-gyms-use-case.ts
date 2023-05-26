/* eslint-disable prettier/prettier */
import { FetchNearbyUseCase } from '../fetch-nearby-gyms'
import { PrismaGymsRepository } from '@/repositories/prisma/prisma-gyms-repo'

export function makeFetchNearbyGymsUseCase() {
  const gymsRepository = new PrismaGymsRepository()
  const fetchNearbyGyms = new FetchNearbyUseCase(gymsRepository)

  return fetchNearbyGyms
}