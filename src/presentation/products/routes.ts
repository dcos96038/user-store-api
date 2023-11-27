import { Router } from 'express'
import { ProductsService } from '../services/products.service'
import { ProductsController } from './controller'

export const productsRoutes = () => {
  const router = Router()
  const productsService = new ProductsService()
  const controller = new ProductsController(productsService)

  router.get('/', controller.getProducts)
  router.post('/', controller.createProduct)

  return router
}
