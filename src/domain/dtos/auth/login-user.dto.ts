import { regularExps } from '../../../config/regular-exp'

interface LoginUserObject {
  email: string
  password: string
}

export class LoginUserDto {
  private constructor (
    public readonly email: string,
    public readonly password: string
  ) {}

  static create (object: LoginUserObject) {
    const { email, password } = object

    if (!email) return ['Email is required', undefined] as const
    if (!regularExps.email.test(email)) return ['Email is invalid', undefined] as const
    if (!password) return ['Password is required', undefined] as const
    if (password.length < 8) return ['Password must be at least 8 characters', undefined] as const

    return [undefined, new LoginUserDto(email, password)] as const
  }
}
