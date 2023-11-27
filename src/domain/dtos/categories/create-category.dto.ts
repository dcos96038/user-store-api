export class CreateCategoryDto {
  private constructor (public readonly name: string, public readonly available: boolean) {}

  static create (object: Record<string, any>) {
    const { name, available } = object
    let availableBoolean = available

    if (!name) return ['Name is required'] as const
    if (typeof available !== 'boolean') {
      availableBoolean = availableBoolean === 'true'
    }

    return [undefined, new CreateCategoryDto(name, availableBoolean)] as const
  }
}
