import mongoose from 'mongoose'

export const validators = {
  isMongoId: (id: string) => {
    return mongoose.isValidObjectId(id)
  }
}
