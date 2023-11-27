import mongoose from 'mongoose'

interface Options {
  mongoUrl: string
  dbName: string
}

export const connect = async (options: Options) => {
  const { mongoUrl, dbName } = options

  try {
    await mongoose.connect(mongoUrl, {
      dbName
    })

    return true
  } catch (error) {
    console.log('Error connecting to MongoDB')
    throw error
  }
}

export const disconnect = async () => {
  try {
    await mongoose.disconnect()
  } catch (error) {
    console.log('Error disconnecting from MongoDB')
    throw error
  }
}
