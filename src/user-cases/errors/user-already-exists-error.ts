/* eslint-disable prettier/prettier */
export class UserAlreadyExistsError extends Error {
  constructor() {
    super('E-mail already exists.')
  }
}
