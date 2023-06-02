/* eslint-disable no-irregular-whitespace */
import { it, describe, expect, beforeEach } from 'vitest'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repo'
import { AuthenticateUseCase } from './authenticate'
import { hash } from 'bcryptjs'
import { InvalidCredentialsError } from './errors/invalid-credentials-erros'

// * The idea of ​this design pattern is to reuse part of the code, but it is "zeroed"
let usersRepository: InMemoryUsersRepository
let sut: AuthenticateUseCase

describe('Authenticate Use case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    sut = new AuthenticateUseCase(usersRepository)
  })

  it('should be able to authenticate', async () => {
    await usersRepository.create({
      name: 'John Doe',
      email: 'johndoe@email.com',
      password_hash: await hash('123456', 6),
    })

    const { user } = await sut.execute({
      email: 'johndoe@email.com',
      password: '123456',
    })
    expect(user).toBeDefined()
    expect(user.id).toEqual(expect.any(String))
  })

  it('should not be able to athenticate with wrong email', async () => {
   await expect(() =>
      sut.execute({
        email: 'jhondoe@email.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })

  it('should not be able to athenticate with wrong password', async () => {
    await usersRepository.create({
        name: 'John Doe',
        email: 'johndoe@email.com',
        password_hash: await hash('123456', 6),
      })

   await expect(() =>
      sut.execute({
        email: 'jhondoe@email.com',
        password: '123123',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })
})
