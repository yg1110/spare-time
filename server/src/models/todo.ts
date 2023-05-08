import mongoose, { Document, Model, Schema } from 'mongoose'

export interface ITodo extends Document {
  title: string
  description: string
  completed: boolean
}

const todoSchema: Schema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  completed: { type: Boolean, default: false },
})

const Todo: Model<ITodo> = mongoose.model<ITodo>('todos', todoSchema)

export default Todo
