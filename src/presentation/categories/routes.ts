import { Router } from 'express'
import { CategoryController } from './controller'
import { AuthMiddleware } from '../../middleware/auth.middleware'
import { CategoriesService } from '../services/categories.service'

export const categoryRoutes = () => {
  const router = Router()
  const categoriesService = new CategoriesService()
  const controller = new CategoryController(categoriesService)

  router.get('/', [AuthMiddleware.validateJWT], controller.getCategories)
  router.post('/', [AuthMiddleware.validateJWT], controller.createCategory)

  return router
}
