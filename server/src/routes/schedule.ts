import { Application, Request, Response } from 'express'
import { BASE_URL } from '../config'
import dayjs from 'dayjs'
import CalendarDate, { IDate } from '../models/date'
import Schedule, { ISchedule } from '../models/schedule'

async function getSchedules(req: Request, res: Response) {
  const { date } = req.params
  try {
    const models = await CalendarDate.findOne({ date }).exec()
    console.log(`models`, models)
    return !models
      ? res.status(200).json([])
      : res.status(200).json(models.schedules)
  } catch (error) {
    console.error('Error getting schedules by ID', error)
    return res.status(500).json({ error: 'Error getting schedules by DATE' })
  }
}

async function addSchedules(model: IDate, req: Request, res: Response) {
  const { title, start, end } = req.body
  if (model.schedules) {
    const schedule: ISchedule = new Schedule({
      title,
      start,
      end,
    })
    model.schedules = [...model.schedules, schedule]
  }
  try {
    const updatedSchedule = await model.save()
    res.status(201).json(updatedSchedule)
  } catch (error) {
    console.error('Error update schedules', error)
    res.status(500).json({ error: 'Error update schedules' })
  }
}

async function createSchedules(date: string, req: Request, res: Response) {
  const { title, start, end } = req.body
  const schedule: ISchedule = new Schedule({
    title,
    start,
    end,
  })
  const dates: IDate = new CalendarDate({
    date: date,
    schedules: schedule,
  })
  try {
    const savedDate = await dates.save()
    res.status(201).json(savedDate)
  } catch (error) {
    console.error('Error saving schedules', error)
    res.status(500).json({ error: 'Error saving schedules' })
  }
}

export const initRoutesSchedule = (app: Application) => {
  app.get(`${BASE_URL}/dates/schedules/:date`, (req: Request, res: Response) =>
    getSchedules(req, res)
  )

  app.post(
    `${BASE_URL}/dates/schedules`,
    async (req: Request, res: Response) => {
      const date = dayjs(req.body.start).format('YYYY-MM-DD')
      const model = await CalendarDate.findOne({ date }).exec()
      return model
        ? addSchedules(model, req, res)
        : createSchedules(date, req, res)
    }
  )
}
