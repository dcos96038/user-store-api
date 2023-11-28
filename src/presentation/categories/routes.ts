import { Router } from 'express'
import { CategoryController } from './controller'
import { CategoriesService } from '../services/categories.service'

export const categoryRoutes = () => {
  const router = Router()
  const categoriesService = new CategoriesService()
  const controller = new CategoryController(categoriesService)

  router.get('/', controller.getCategories)
  router.post('/', controller.createCategory)

  return router
}
