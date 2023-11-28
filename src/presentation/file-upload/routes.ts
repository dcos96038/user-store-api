import { Router } from 'express'
import { FileUploadController } from './controller'
import { FileUploadService } from '../services/file-upload.service'

export const fileUploadRoutes = () => {
  const router = Router()
  const fileUploadService = new FileUploadService()
  const controller = new FileUploadController(fileUploadService)

  router.post('/single/:type', controller.uploadFile)
  router.post('/multiple/:type', controller.uploadMultiFile)

  return router
}
