export class CustomError extends Error {
  private constructor (message: string, public readonly statusCode: number = 400) {
    super(message)
    this.name = this.constructor.name
    Error.captureStackTrace(this, this.constructor)
  }

  static badRequest (message: string) {
    return new CustomError(message, 400)
  }

  static unauthorized (message: string) {
    return new CustomError(message, 401)
  }

  static forbidden (message: string) {
    return new CustomError(message, 403)
  }

  static notFound (message: string) {
    return new CustomError(message, 404)
  }

  static internalServerError (message: string) {
    return new CustomError(message, 500)
  }
}
