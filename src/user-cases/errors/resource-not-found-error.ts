/* eslint-disable prettier/prettier */
export class ResourceNotFoundError extends Error {
  constructor() {
    super('Resource not found.')
  }
}
