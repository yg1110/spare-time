import { DATABASE_NAME, MONGO_URL } from '../config'
import mongoose, { ConnectOptions } from 'mongoose'

const connectDB = async () => {
  const mongoUrl = `${MONGO_URL}/${DATABASE_NAME}`
  try {
    await mongoose.connect(mongoUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    } as ConnectOptions)
    console.log('Connected to MongoDB')
  } catch (error) {
    console.error('Error connecting to MongoDB', error)
  }
}

export default connectDB
