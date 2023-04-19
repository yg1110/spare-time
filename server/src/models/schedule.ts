import mongoose, { Document, Model, Schema } from 'mongoose'

export interface ISchedule extends Document {
  dateId: string
  title: string
  location?: string
}

const scheduleSchema: Schema = new mongoose.Schema({
  dateId: { type: String, required: true },
  title: { type: String, required: true },
  location: { type: String },
})

const Schedule: Model<ISchedule> = mongoose.model<ISchedule>(
  'schedules',
  scheduleSchema
)

export default Schedule
