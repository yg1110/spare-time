import { Application } from 'express'
import { BASE_URL } from '../config'
import { login, password, profile, signup } from './auth'

const initRoutes = (app: Application) => {
  app.post(`${BASE_URL}/auth/login`, login)
  app.post(`${BASE_URL}/auth/signup`, signup)
  app.post(`${BASE_URL}/auth/password`, password)
  app.get(`${BASE_URL}/auth/user`, profile)
}

export default initRoutes
