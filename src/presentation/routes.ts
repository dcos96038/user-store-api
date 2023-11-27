import { Router } from 'express'

import { categoryRoutes } from './categories/routes'
import { authRoutes } from './auth/routes'

export const appRoutes = () => {
  const router = Router()

  router.use('/api/auth', authRoutes())
  router.use('/api/categories', categoryRoutes())

  return router
}
