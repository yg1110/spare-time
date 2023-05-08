import mongoose, { Document, Model, Schema } from 'mongoose'

export interface ISchedule extends Document {
  title: string
  location?: string
  start: Date
  end: Date
  createdAt: Date
  updatedAt: Date
}

const scheduleSchema: Schema = new mongoose.Schema({
  title: { type: String, required: true },
  location: { type: String },
  start: { type: Date, required: true },
  end: { type: Date, required: true },
  createdAt: { type: Date, default: new Date() },
  updatedAt: { type: Date, default: new Date() },
})

const Schedule: Model<ISchedule> = mongoose.model<ISchedule>(
  'schedules',
  scheduleSchema
)

export default Schedule
