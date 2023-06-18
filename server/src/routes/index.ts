import { Application } from 'express'
import { BASE_URL } from '../config'
import { deleteTodo, getTodo, getTodos, insertTodo, updateTodo } from './todos'
import { getDates } from './date'

const initRoutes = (app: Application) => {
  app.get(`${BASE_URL}/dates`, getDates)
  app.get(`${BASE_URL}/todos`, getTodos)
  app.get(`${BASE_URL}/todos/:id`, getTodo)
  app.post(`${BASE_URL}/todos`, insertTodo)
  app.patch(`${BASE_URL}/todos/:id`, updateTodo)
  app.delete(`${BASE_URL}/todos/:id`, deleteTodo)
}

export default initRoutes
