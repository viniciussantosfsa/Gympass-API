import { Prisma, Role, User } from '@prisma/client'
import { UsersRepository } from '../users-repo'
import { randomUUID } from 'node:crypto'

export class InMemoryUsersRepository implements UsersRepository {
  public items: User[] = []

  async findById(id: string) {
    const user = this.items.find((item: { id: string }) => item.id === id)
    if (!user) {
      return null
    }
    return user
  }

  async findByEmail(email: string) {
    const user = this.items.find((item: { email: string }) => item.email === email)
    if (!user) {
      return null
    }
    return user
  }

  async create(data: Prisma.UserCreateInput): Promise<User> {
    const user: User = {
      id: randomUUID(),
      name: data.name,
      email: data.email,
      password_hash: data.password_hash,
      role: Role.MEMBER,
      create_at: new Date(),
    }
    this.items.push(user)

    return user
  }
}
