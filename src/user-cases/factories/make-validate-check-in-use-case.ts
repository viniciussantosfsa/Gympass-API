import { PrismaCheckInsRepository } from '@/repositories/prisma/prisma-check-ins-repo'
import { ValidateCheckInUseCase } from '../validate-check-in'

export function makeValidateCheckInUseCase() {
  const checkInsRepository = new PrismaCheckInsRepository()
  const validateCheckIn = new ValidateCheckInUseCase(checkInsRepository)

  return validateCheckIn
}