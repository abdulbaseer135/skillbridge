import mongoose from 'mongoose'
import { MongoMemoryServer } from 'mongodb-memory-server'
import { connectDB } from '../config/db.js'

let mongoServer

export const setupTestDB = async () => {
  mongoServer = await MongoMemoryServer.create()
  await connectDB(mongoServer.getUri())
}

export const teardownTestDB = async () => {
  await mongoose.connection.dropDatabase()
  await mongoose.connection.close()
  if (mongoServer) {
    await mongoServer.stop()
  }
}
