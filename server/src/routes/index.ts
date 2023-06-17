import { Application } from 'express'
import { initRoutesDate } from './date'
import { initRoutesSchedule } from './schedule'
import { initRoutesDiary } from './diary'

const initRoutes = (app: Application) => {
  initRoutesDate(app)
  initRoutesSchedule(app)
  initRoutesDiary(app)
  // initRoutesTodo(app)
}

export default initRoutes
