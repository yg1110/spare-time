import mongoose, { Document, Model, Schema } from 'mongoose'

export interface ITime extends Document {
  category: string
  startTime: string
  endTime: string
}

const timeSchema: Schema = new mongoose.Schema({
  category: { type: String, required: true },
  startTime: { type: String, required: true, default: new Date() },
  endTime: { type: String, required: true, default: new Date() },
})

const Time: Model<ITime> = mongoose.model<ITime>('Time', timeSchema)

export default Time
