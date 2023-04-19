import mongoose, { Document, Model, Schema } from 'mongoose'

export interface IDate extends Document {
  title: string
  start: Date
  end: Date
}

const dateSchema: Schema = new mongoose.Schema({
  title: { type: String, required: true, default: '' },
  start: { type: Date, required: true, default: new Date() },
  end: { type: Date, required: true, default: new Date() },
})

const CalendarDate: Model<IDate> = mongoose.model<IDate>('dates', dateSchema)

export default CalendarDate
