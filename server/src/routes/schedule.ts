import { Application, Request, Response } from 'express'
import { BASE_URL } from '../config'
import Schedule, { ISchedule } from '../models/schedule'

export const initRoutesSchedule = (app: Application) => {
  app.get(`${BASE_URL}/schedules`, async (req: Request, res: Response) => {
    try {
      const schedules: ISchedule[] = await Schedule.find().exec()
      res.status(200).json(schedules)
    } catch (error) {
      console.error('Error getting schedules', error)
      res.status(500).json({ error: 'Error getting schedules' })
    }
  })
}
