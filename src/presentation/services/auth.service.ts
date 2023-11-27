import { bcryptAdapter } from '../../config/bcrypt.adapter'
import { envs } from '../../config/envs'
import { jwtAdapter } from '../../config/jwt.adapter'
import { UserModel } from '../../data/mongo/models/user.model'
import { type LoginUserDto } from '../../domain/dtos/auth/login-user.dto'
import { type RegisterUserDto } from '../../domain/dtos/auth/register-user.dto'
import { UserEntity } from '../../domain/entities/user.entity'
import { CustomError } from '../../domain/errors/custom.error'
import { type EmailService } from './email.service'

export class AuthService {
  constructor (private readonly emailService: EmailService) {}

  public async registerUser (registerUserDto: RegisterUserDto) {
    const userExists = await UserModel.findOne({ email: registerUserDto.email })

    if (userExists) throw CustomError.badRequest('Email already exists')

    const user = new UserModel(registerUserDto)

    user.password = await bcryptAdapter.hash(user.password)

    await user.save()

    await this.sendEmailValidationlink(user.email)

    const userEntity = UserEntity.fromObject(user)

    const { password, ...userWithoutPassword } = userEntity

    const token = await jwtAdapter.sign({ id: user.id })

    return {
      user: userWithoutPassword,
      token
    }
  }

  public async loginUser (loginUserDto: LoginUserDto) {
    const user = await UserModel.findOne({ email: loginUserDto.email })

    if (!user) throw CustomError.badRequest('Email or password is incorrect')

    const passwordMatch = await bcryptAdapter.compare(loginUserDto.password, user.password)

    if (!passwordMatch) throw CustomError.badRequest('Email or password is incorrect')

    const userEntity = UserEntity.fromObject(user)

    const { password, ...userWithoutPassword } = userEntity

    const token = await jwtAdapter.sign({ id: user.id })
    if (!token) throw CustomError.internalServerError('Error generating token')

    return {
      user: userWithoutPassword,
      token
    }
  }

  private readonly sendEmailValidationlink = async (email: string) => {
    const token = await jwtAdapter.sign({ email })

    if (!token) throw CustomError.internalServerError('Error generating token')

    const link = `${envs.WEBSERVICE_URL}/auth/validate-email?token=${token}`

    const html = `
      <h1>Validate your email</h1>
      <p>Click on the link below to validate your email</p>
      <a href="${link}">Validate email</a>
      `

    const options = {
      to: email,
      subject: 'Validate your email',
      htmlBody: html
    }

    const emailSent = await this.emailService.sendEmail(options)

    if (!emailSent) throw CustomError.internalServerError('Error sending email')

    return true
  }

  public validateEmail = async (token: string) => {
    const payload = await jwtAdapter.verify(token)

    if (!payload) throw CustomError.unauthorized('Invalid token')

    const { email } = payload as { email: string }
    if (!email) throw CustomError.internalServerError('Error validating email')

    const user = await UserModel.findOne({ email })

    if (!user) throw CustomError.internalServerError('User not found')

    user.emailValidated = true

    await user.save()

    return {
      message: 'Email validated'
    }
  }
}
