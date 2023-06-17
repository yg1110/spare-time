import mongoose, { Document, Model, Schema } from 'mongoose'

export interface ISchedule extends Document {
  title: string
  location?: string
  start: string
  end: string
  createdAt: string
  updatedAt: string
}

const scheduleSchema: Schema = new mongoose.Schema({
  title: { type: String, required: true },
  location: { type: String },
  start: { type: String, required: true },
  end: { type: String, required: true },
  createdAt: { type: String, default: new Date() },
  updatedAt: { type: String, default: new Date() },
})

const Schedule: Model<ISchedule> = mongoose.model<ISchedule>(
  'schedules',
  scheduleSchema
)

export default Schedule
