import { Application } from 'express'
import { initRoutesDate } from './date'
import { initRoutesSchedule } from './schedule'

export const initRoutes = (app: Application) => {
  initRoutesDate(app)
  initRoutesSchedule(app)
  // initRoutesTodo(app)
  // initRoutesDiary(app)
  // initRoutesTime(app)
  // initRoutesSleep(app)
}
