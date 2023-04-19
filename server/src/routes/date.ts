import { Application, Request, Response } from 'express'
import { BASE_URL } from '../config'
import CalendarDate, { IDate } from '../models/date'

export const initRoutesDate = (app: Application) => {
  app.get(`${BASE_URL}/dates`, async (req: Request, res: Response) => {
    try {
      const dates: IDate[] = await CalendarDate.find().exec()
      res.status(200).json(dates)
    } catch (error) {
      console.error('Error getting dates', error)
      res.status(500).json({ error: 'Error getting dates' })
    }
  })
}
