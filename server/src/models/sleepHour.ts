import mongoose, { Document, Model, Schema } from 'mongoose'

export interface ISleepHour extends Document {
  startTime: Date
  endTIme: Date
  sleepingTime: number
}

const sleepHourSchema: Schema = new mongoose.Schema({
  dateId: { type: String, required: true },
  startTime: { type: Date, required: true, default: new Date() },
  endTIme: { type: Date, required: true, default: new Date() },
  sleepingTime: { type: Number, required: true, default: 0 },
})

const SleepHour: Model<ISleepHour> = mongoose.model<ISleepHour>(
  'sleephours',
  sleepHourSchema
)

export default SleepHour
