export class CreateProductDto {
  private constructor (
    public readonly name: string,
    public readonly available: boolean,
    public readonly price: number,
    public readonly userId: string,
    public readonly categoryId: string,
    public readonly description?: string
  ) {}

  static create (object: Record<string, any>) {
    const { name, available, price, description, userId, categoryId } = object

    let availableBoolean = available

    if (!name) return ['Name is required'] as const
    if (typeof available !== 'boolean') {
      availableBoolean = availableBoolean === 'true'
    }

    if (!price) return ['Price is required'] as const

    if (!userId) return ['UserId is required'] as const

    if (!categoryId) return ['CategoryId is required'] as const

    return [undefined, new CreateProductDto(name, availableBoolean, price, userId, categoryId, description)] as const
  }
}
