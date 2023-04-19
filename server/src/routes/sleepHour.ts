import { Application, Request, Response } from 'express'
import { BASE_URL } from '../config'
import Sleep, { ISleepHour } from '../models/sleepHour'

export const initRoutesSleep = (app: Application) => {
  app.get(`${BASE_URL}/sleep-hours`, async (req: Request, res: Response) => {
    try {
      const sleepHours: ISleepHour[] = await Sleep.find().exec()
      res.status(200).json(sleepHours)
    } catch (error) {
      console.error('Error getting sleepHours', error)
      res.status(500).json({ error: 'Error getting sleepHours' })
    }
  })
}
