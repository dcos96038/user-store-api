import { regularExps } from '../../../config/regular-exp'

interface RegisterUserObject {
  name: string
  email: string
  password: string
  image?: string
}

export class RegisterUserDto {
  private constructor (
    public readonly name: string,
    public readonly email: string,
    public readonly password: string,
    public readonly image?: string
  ) {}

  static create (object: RegisterUserObject) {
    const { name, email, password, image } = object

    if (!name) return ['Name is required', undefined] as const
    if (!email) return ['Email is required', undefined] as const
    if (!regularExps.email.test(email)) return ['Email is invalid', undefined] as const
    if (!password) return ['Password is required', undefined] as const
    if (password.length < 8) return ['Password must be at least 8 characters', undefined] as const

    return [undefined, new RegisterUserDto(name, email, password, image)] as const
  }
}
