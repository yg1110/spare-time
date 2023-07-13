import mongoose, { Document, Model, Schema } from 'mongoose'

export interface IUsers extends Document {
  id: string
  password: string
  name?: string
  question?: string
  answer?: string
}

const userSchema: Schema = new mongoose.Schema({
  id: { type: String, required: '', default: '' },
  password: { type: String, required: '', default: '' },
  name: { type: String, default: '' },
  question: { type: String, default: '' },
  answer: { type: String, default: '' },
})

const User: Model<IUsers> = mongoose.model<IUsers>('users', userSchema)

export default User
