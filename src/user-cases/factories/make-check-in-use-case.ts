import { PrismaCheckInsRepository } from '@/repositories/prisma/prisma-check-ins-repo'
import { CheckInUseCase } from '../check-in'
import { PrismaGymsRepository } from '@/repositories/prisma/prisma-gyms-repo'

export function makeCheckInUseCase() {
  const checkInsRepository = new PrismaCheckInsRepository()
  const gymsRepository = new PrismaGymsRepository()
  const checkInUseCase = new CheckInUseCase(checkInsRepository, gymsRepository)

  return checkInUseCase
}