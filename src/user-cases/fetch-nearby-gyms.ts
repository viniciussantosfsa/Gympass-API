import { GymsRepository } from '@/repositories/gyms-repo'
import { Gym } from '@prisma/client'

interface FetchNearbyUseCaseRequest {
    userLatitude: number,
    userLongitude: number,
}

interface FetchNearbyUseCaseResponse {
  gyms: Gym[]
}

export class FetchNearbyUseCase {
  constructor(private gymsRepository: GymsRepository){}

  async execute({
    userLatitude,
    userLongitude
   }: FetchNearbyUseCaseRequest): Promise<FetchNearbyUseCaseResponse> {
    const gyms = await this.gymsRepository.findManyNearby({
        latitude: userLatitude,
        longitude: userLongitude
    })

    return { gyms }
   }
}
