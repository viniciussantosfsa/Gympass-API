import { Gym, Prisma } from '@prisma/client'

export interface findManyNearbyByParams {
  latitude: number
  longitude: number
}
export interface GymsRepository {
  findById(id: string): Promise<Gym | null>
  findManyNearby(params: findManyNearbyByParams): Promise<Gym[]>
  searchMany(query: string, page: number): Promise<Gym[]>
  create(data: Prisma.GymCreateInput): Promise<Gym>
}
