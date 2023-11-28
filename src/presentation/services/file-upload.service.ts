import { type UploadedFile } from 'express-fileupload'
import { CustomError } from '../../domain/errors/custom.error'
import path from 'path'
import fs from 'fs'
import { uuidAdapter } from '../../config/uuid.adapter'

export class FileUploadService {
  constructor (private readonly uuid = uuidAdapter.generate) {}

  private checkFolder (folderPath: string) {
    if (!fs.existsSync(folderPath)) {
      fs.mkdirSync(folderPath)
    }
  }

  async uploadSingle (file: UploadedFile, folderPath: string = 'uploads', validExtensions: string[] = ['gif', 'jpeg', 'jpg', 'png', 'svg']) {
    const fileExtension = file.mimetype.split('/').at(1)
    const destination = path.resolve(__dirname, '..', '..', '..', folderPath)
    this.checkFolder(destination)

    const fileName = `${this.uuid()}.${fileExtension}`

    if (!fileExtension) throw CustomError.badRequest('Invalid file extension')

    const isValidExtension = validExtensions.includes(fileExtension)

    if (!isValidExtension) throw CustomError.badRequest(`Extension '${fileExtension}' is invalid. Valid extensions: ${validExtensions.join(', ')}`)

    await file.mv(`${destination}/${fileName}`)
    return fileName
  }

  uploadMulti (files: any[], folderPath: string = 'uploads', validExtensions: string[] = ['png', 'jpg', 'jpeg', 'gif']) {
    return 'Upload Multi'
  }
}
