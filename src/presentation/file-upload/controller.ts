import { type Response, type Request } from 'express'
import { CustomError } from '../../domain/errors/custom.error'

export class FileUploadController {
  // constructor

  private readonly handleError = (err: unknown, res: Response) => {
    if (err instanceof CustomError) {
      return res.status(err.statusCode).json({ message: err.message })
    }

    return res.status(500).json({ message: 'Internal server error' })
  }

  uploadFile = (req: Request, res: Response) => {
    return 'Upload File'
  }

  uploadMultiFile = (req: Request, res: Response) => {
    return 'Upload Multi File'
  }
}
