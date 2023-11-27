import { Router } from 'express'
import { AuthController } from './controller'
import { AuthService } from '../services/auth.service'
import { EmailService } from '../services/email.service'
import { envs } from '../../config/envs'

export const authRoutes = () => {
  const router = Router()
  const emailService = new EmailService(envs.MAILER_SERVICE, envs.MAILER_EMAIL, envs.MAILER_SECRET_KEY)
  const authService = new AuthService(emailService)
  const constroller = new AuthController(authService)

  router.post('/login', constroller.login)
  router.post('/register', constroller.register)
  router.post('/validate-email', constroller.validateEmail)

  return router
}
