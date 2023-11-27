import { Router } from 'express'

import { categoryRoutes } from './categories/routes'
import { authRoutes } from './auth/routes'
import { productsRoutes } from './products/routes'

export const appRoutes = () => {
  const router = Router()

  router.use('/api/auth', authRoutes())
  router.use('/api/categories', categoryRoutes())
  router.use('/api/products', productsRoutes())

  return router
}
