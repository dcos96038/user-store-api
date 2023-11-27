import { type Request, type Response } from 'express'
import { RegisterUserDto } from '../../domain/dtos/auth/register-user.dto'
import { type AuthService } from '../services/auth.service'
import { CustomError } from '../../domain/errors/custom.error'
import { LoginUserDto } from '../../domain/dtos/auth/login-user.dto'

export class AuthController {
  constructor (readonly authService: AuthService) {}

  private readonly handleError = (error: unknown, res: Response) => {
    if (error instanceof CustomError) {
      return res.status(error.statusCode).json({ message: error.message })
    }

    return res.status(500).json({ message: 'Internal server error' })
  }

  register = (req: Request, res: Response) => {
    const [error, registerUserDto] = RegisterUserDto.create(req.body)

    if (error) return res.status(400).json({ error })

    this.authService.registerUser(registerUserDto).then((response) => {
      res.json(response)
    }
    ).catch((error) => {
      this.handleError(error, res)
    })
  }

  login = (req: Request, res: Response) => {
    const [error, loginUserDto] = LoginUserDto.create(req.body)

    if (error) return res.status(400).json({ error })

    this.authService.loginUser(loginUserDto).then((response) => {
      res.json(response)
    }
    ).catch((error) => {
      this.handleError(error, res)
    })
  }

  validateEmail = (req: Request, res: Response) => {
    const token = req.query.token as string

    if (!token) return res.status(400).json({ message: 'Token is required' })

    this.authService.validateEmail(token).then((response) => {
      res.json(response)
    }
    ).catch((error) => {
      this.handleError(error, res)
    })
  }
}
