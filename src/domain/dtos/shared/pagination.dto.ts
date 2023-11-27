export class PaginationDto {
  private constructor (readonly page: number, readonly limit: number) {}

  static create (object: Record<string, any>) {
    const { page = 1, limit = 10 } = object

    if (isNaN(page) || isNaN(limit)) return ['Page and limit must be numbers'] as const

    if (page < 1) return ['Page must be greater than 0'] as const

    if (limit < 1) return ['Limit must be greater than 0'] as const

    return [undefined, new PaginationDto(page, limit)] as const
  }
}
