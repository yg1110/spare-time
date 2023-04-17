import { Application, Request, Response } from 'express'
import Time, { ITime } from '../models/time'

export const initRoutesTime = (app: Application) => {
  app.get('/api/time', async (req: Request, res: Response) => {
    try {
      const times: ITime[] = await Time.find().exec()
      res.status(200).json(times)
    } catch (error) {
      console.error('Error getting todos', error)
      res.status(500).json({ error: 'Error getting todos' })
    }
  })

  app.post('/api/time', async (req: Request, res: Response) => {
    const { category, startTime, endTime } = req.body
    const time: ITime = new Time({
      category,
      startTime,
      endTime,
    })
    try {
      await time.save()
      res.status(201).json(true)
    } catch (error) {
      console.error('Error saving todo', error)
      res.status(500).json({ error: 'Error saving todo' })
    }
  })
}
