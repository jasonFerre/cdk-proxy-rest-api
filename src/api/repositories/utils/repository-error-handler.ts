import { StatusCodes } from 'http-status-codes'

export class RepositoryCustomError extends Error {
  statusCode: StatusCodes
  detail: string

  constructor(message: string, detail: string, statusCode: StatusCodes) {
    super(message)
    this.name = 'RepositoryCustomError'
    this.detail = detail
    this.statusCode = statusCode
  }
}
