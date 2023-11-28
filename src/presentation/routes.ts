import { Router } from 'express'

import { categoryRoutes } from './categories/routes'
import { authRoutes } from './auth/routes'
import { productsRoutes } from './products/routes'
import { AuthMiddleware } from '../middleware/auth.middleware'
import { fileUploadRoutes } from './file-upload/routes'

export const appRoutes = () => {
  const router = Router()

  router.use('/api/auth', authRoutes())
  router.use('/api/categories', [AuthMiddleware.validateJWT], categoryRoutes())
  router.use('/api/products', [AuthMiddleware.validateJWT], productsRoutes())
  router.use('/api/file-upload', fileUploadRoutes())

  return router
}
