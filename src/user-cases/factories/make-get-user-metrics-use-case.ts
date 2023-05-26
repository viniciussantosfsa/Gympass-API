/* eslint-disable prettier/prettier */
import { PrismaCheckInsRepository } from '@/repositories/prisma/prisma-check-ins-repo'
import { GetUserMetricsUseCase } from '../get-user-metrics'

export function makeGetUserMetricsUseCase() {
  const checkInsRepository = new PrismaCheckInsRepository()
  const getUserMetrics = new GetUserMetricsUseCase(checkInsRepository)

  return getUserMetrics
}