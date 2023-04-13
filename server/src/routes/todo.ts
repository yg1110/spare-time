import { Application, Request, Response } from 'express'
import Todo, { ITodo } from '../models/todo'

export const initRoutesTodo = (app: Application) => {
  app.get('/todos', async (req: Request, res: Response) => {
    try {
      const todos: ITodo[] = await Todo.find().exec()
      res.status(200).json(todos)
    } catch (error) {
      console.error('Error getting todos', error)
      res.status(500).json({ error: 'Error getting todos' })
    }
  })

  app.post('/todos', async (req: Request, res: Response) => {
    const { title, description, completed } = req.body
    const todo: ITodo = new Todo({
      title,
      description,
      completed,
    })
    try {
      const savedTodo = await todo.save()
      res.status(201).json(savedTodo)
    } catch (error) {
      console.error('Error saving todo', error)
      res.status(500).json({ error: 'Error saving todo' })
    }
  })

  app.get('/todos/:id', async (req: Request, res: Response) => {
    const { id } = req.params
    try {
      const todo: ITodo | null = await Todo.findById(id).exec()
      if (!todo) {
        res.status(404).json({ error: 'Todo not found' })
      } else {
        res.status(200).json(todo)
      }
    } catch (error) {
      console.error('Error getting todo by ID', error)
      res.status(500).json({ error: 'Error getting todo by ID' })
    }
  })

  app.patch('/todos/:id', async (req: Request, res: Response) => {
    const { id } = req.params
    const { title, description, completed } = req.body
    try {
      const todo: ITodo | null = await Todo.findById(id).exec()
      if (!todo) {
        res.status(404).json({ error: 'Todo not found' })
        return
      }
      if (title) {
        todo.title = title
      }
      if (description) {
        todo.description = description
      }
      if (completed !== undefined) {
        todo.completed = completed
      }
      const updatedTodo = await todo.save()
      res.status(200).json(updatedTodo)
    } catch (error) {
      console.error('Error updating todo', error)
      res.status(500).json({ error: 'Error updating todo' })
    }
  })

  app.delete('/todos/:id', async (req: Request, res: Response) => {
    const { id } = req.params
    try {
      const deletedTodo: ITodo | null = await Todo.findByIdAndDelete(id).exec()
      if (!deletedTodo) {
        res.status(404).json({ error: 'Todo not found' })
      } else {
        res.status(200).json(deletedTodo)
      }
    } catch (error) {
      console.error('Error deleting todo', error)
      res.status(500).json(error)
    }
  })
}
