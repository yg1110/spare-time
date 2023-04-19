import { Application, Request, Response } from 'express'
import { BASE_URL } from '../config'
import Diary, { IDiary } from '../models/diary'

export const initRoutesDiary = (app: Application) => {
  app.get(`${BASE_URL}/diaries`, async (req: Request, res: Response) => {
    try {
      const diaries: IDiary[] = await Diary.find().exec()
      res.status(200).json(diaries)
    } catch (error) {
      console.error('Error getting diaries', error)
      res.status(500).json({ error: 'Error getting diaries' })
    }
  })
}
