import { type Response, type Request } from 'express'
import { CustomError } from '../../domain/errors/custom.error'
import { type FileUploadService } from '../services/file-upload.service'
import { type UploadedFile } from 'express-fileupload'

export class FileUploadController {
  constructor (private readonly fileUploadService: FileUploadService) { }

  private readonly handleError = (err: unknown, res: Response) => {
    if (err instanceof CustomError) {
      return res.status(err.statusCode).json({ message: err.message })
    }

    return res.status(500).json({ message: 'Internal server error' })
  }

  uploadFile = (req: Request, res: Response) => {
    const files = req.files

    if (!files || Object.keys(files).length === 0) throw CustomError.badRequest('No files were uploaded.')

    const file = files.file as UploadedFile

    this.fileUploadService.uploadSingle(file).then((response) => {
      return res.json(response)
    }
    ).catch((error) => {
      return this.handleError(error, res)
    })
  }

  uploadMultiFile = (req: Request, res: Response) => {
    return 'Upload Multi File'
  }
}
