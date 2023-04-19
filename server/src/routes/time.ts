import { Application, Request, Response } from 'express'
import { BASE_URL } from '../config'
import Time, { ITime } from '../models/time'

export const initRoutesTime = (app: Application) => {
  app.get(`${BASE_URL}/times`, async (req: Request, res: Response) => {
    try {
      const times: ITime[] = await Time.find().exec()
      res.status(200).json(times)
    } catch (error) {
      console.error('Error getting times', error)
      res.status(500).json({ error: 'Error getting times' })
    }
  })
}
