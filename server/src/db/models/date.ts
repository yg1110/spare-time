import mongoose, { Document, Model, Schema } from 'mongoose'
import { ITodo } from './todo'
import { IDiary } from './diary'
import { ISchedule } from './schedule'

export interface IDate extends Document {
  date: string
  todos?: ITodo[]
  diaries?: IDiary[]
  schedules?: ISchedule[]
}

const dateSchema: Schema = new mongoose.Schema({
  date: { type: String, required: true, default: new Date() },
  todos: { type: Array, default: [] },
  diaries: { type: Array, default: [] },
  schedules: { type: Array, default: [] },
})

const CalendarDate: Model<IDate> = mongoose.model<IDate>('dates', dateSchema)

export default CalendarDate
