export class PaginationDto {
  private constructor (readonly page: number, readonly limit: number) {}

  static create (page: number = 1, limit: number = 10) {
    if (!page) return ['Page is required'] as const

    if (!limit) return ['Limit is required'] as const

    if (isNaN(page) || isNaN(limit)) return ['Page and limit must be numbers'] as const

    if (page < 1) return ['Page must be greater than 0'] as const

    if (limit < 1) return ['Limit must be greater than 0'] as const

    return [undefined, new PaginationDto(page, limit)] as const
  }
}
