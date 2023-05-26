/* eslint-disable prettier/prettier */
import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repo'
import { GetUserProfileUseCase } from '../get-user-profile'

export function makeGetUserProfileUseCase() {
  const usersRepository = new PrismaUsersRepository()
  const getUserProfileUseCase = new GetUserProfileUseCase(usersRepository)

  return getUserProfileUseCase
}