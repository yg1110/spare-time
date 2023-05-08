import mongoose, { Document, Model, Schema } from 'mongoose'

export interface IDiary extends Document {
  title: string
  content: string
}

const diarySchema: Schema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
})

const Diary: Model<IDiary> = mongoose.model<IDiary>('diaries', diarySchema)

export default Diary
