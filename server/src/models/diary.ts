import mongoose, { Document, Model, Schema } from 'mongoose'

export interface IDiary extends Document {
  dateId: string
  title: string
  content: string
}

const diarySchema: Schema = new mongoose.Schema({
  dateId: { type: String, required: true },
  title: { type: String, required: true },
  content: { type: String, required: true },
})

const Diary: Model<IDiary> = mongoose.model<IDiary>('diaries', diarySchema)

export default Diary
