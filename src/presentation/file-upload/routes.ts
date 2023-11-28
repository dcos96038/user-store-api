import { Router } from 'express'
import { FileUploadController } from './controller'

export const fileUploadRoutes = () => {
  const router = Router()
  const controller = new FileUploadController()

  router.post('/single/:type', controller.uploadFile)
  router.post('/multiple/:type', controller.uploadMultiFile)

  return router
}
