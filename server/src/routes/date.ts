import { Application, Request, Response } from 'express'
import { BASE_URL } from '../config'
import CalendarDate, { IDate } from '../models/date'

async function getDateRange(req: Request, res: Response) {
  const { startDate, endDate } = req.query
  try {
    const models = await CalendarDate.find({
      date: { $gte: startDate, $lte: endDate },
    })
    return !models ? res.status(200).json([]) : res.status(200).json(models)
  } catch (error) {
    console.error('Error getting date by ID', error)
    return res.status(500).json({ error: 'Error getting date by DATE' })
  }
}

async function getDate(req: Request, res: Response) {
  try {
    const dates: IDate[] = await CalendarDate.find().exec()
    res.status(200).json(dates)
  } catch (error) {
    console.error('Error getting dates', error)
    res.status(500).json({ error: 'Error getting dates' })
  }
}

export const initRoutesDate = (app: Application) => {
  app.get(`${BASE_URL}/dates`, async (req: Request, res: Response) => {
    const { startDate, endDate } = req.query
    if (startDate && endDate) {
      await getDateRange(req, res)
    } else {
      await getDate(req, res)
    }
  })
}
