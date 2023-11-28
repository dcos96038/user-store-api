import { type UploadedFile } from 'express-fileupload'
import { CustomError } from '../../domain/errors/custom.error'
import path from 'path'
import fs from 'fs'

export class FileUploadService {
  // constructor() {}

  private checkFolder (folderPath: string) {
    if (!fs.existsSync(folderPath)) {
      fs.mkdirSync(folderPath)
    }
  }

  async uploadSingle (file: UploadedFile, folderPath: string = 'uploads', validExtensions: string[] = ['png', 'jpg', 'jpeg', 'gif']) {
    try {
      const fileExtension = file.mimetype.split('/').at(1)
      const destination = path.resolve(__dirname, '..', '..', '..', folderPath)
      this.checkFolder(destination)

      await file.mv(`${destination}/${file.name}`)

      if (!fileExtension) throw CustomError.badRequest('Invalid file extension')

      const isValidExtension = validExtensions.includes(fileExtension)

      if (!isValidExtension) throw CustomError.badRequest('Invalid file extension')

      return 'Upload Single'
    } catch (error) {
      throw CustomError.internalServerError("Couldn't upload file")
    }
  }

  uploadMulti (files: any[], folderPath: string = 'uploads', validExtensions: string[] = ['png', 'jpg', 'jpeg', 'gif']) {
    return 'Upload Multi'
  }
}
