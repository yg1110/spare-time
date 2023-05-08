import mongoose, { Document, Model, Schema } from 'mongoose'

export interface ITime extends Document {
  playTime: number
  focusTime: number
}

const timeSchema: Schema = new mongoose.Schema({
  dateId: { type: String, required: true },
  playTime: { type: Number, required: true, default: 0 },
  focusTime: { type: Number, required: true, default: 0 },
})

const Time: Model<ITime> = mongoose.model<ITime>('times', timeSchema)

export default Time
