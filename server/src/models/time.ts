import mongoose, { Document, Model, Schema } from 'mongoose'
import dayjs from 'dayjs'

export interface ITime extends Document {
  category: string
  date: string
  startTime: Date
  endTime: Date
  hours: number[]
  createdAt: Date
  updatedAt: Date
}

const timeSchema: Schema = new mongoose.Schema({
  category: { type: String, required: true, default: '' },
  date: {
    type: String,
    required: true,
    default: dayjs(new Date()).format('YYYY-MM-DD'),
  },
  startTime: { type: Date, required: true, default: new Date() },
  endTime: { type: Date, required: true, default: new Date() },
  hours: {
    type: [],
    default: Array.from({ length: 24 }, (_, i: number) => i),
  },
  createdAt: { type: Date, default: new Date() },
  updatedAt: { type: Date, default: new Date() },
})

const Time: Model<ITime> = mongoose.model<ITime>('Time', timeSchema)

export default Time
