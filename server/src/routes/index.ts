import { Application } from 'express'
import { BASE_URL } from '../config'
import { check, login, logout, password, profile, signup } from './auth'

const initRoutes = (app: Application) => {
  app.get(`${BASE_URL}/auth/check`, check)
  app.post(`${BASE_URL}/auth/login`, login)
  app.post(`${BASE_URL}/auth/logout`, logout)
  app.post(`${BASE_URL}/auth/signup`, signup)
  app.post(`${BASE_URL}/auth/password`, password)
  app.get(`${BASE_URL}/auth/user`, profile)
}

export default initRoutes
