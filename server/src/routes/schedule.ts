import mongoose from 'mongoose'
import dayjs from 'dayjs'
import CalendarDate, { IDate } from '../models/date'
import Schedule, { ISchedule } from '../models/schedule'
import { Application, Request, Response } from 'express'
import { BASE_URL } from '../config'

async function getSchedulesByDate(req: Request, res: Response) {
  const { date } = req.query
  try {
    const models = await CalendarDate.findOne({ date }).exec()
    return !models
      ? res.status(200).json([])
      : res.status(200).json(models.schedules)
  } catch (error) {
    console.error('Error getting schedules by DATE', error)
    return res.status(500).json({ error: 'Error getting schedules by DATE' })
  }
}

async function getSchedulesById(req: Request, res: Response) {
  const { scheduleId } = req.query
  const id = new mongoose.Types.ObjectId(scheduleId as string)
  try {
    const models = await CalendarDate.aggregate([
      { $unwind: '$schedules' },
      { $match: { 'schedules._id': id } },
    ])
    return !models
      ? res.status(200).json([])
      : res.status(200).json(models[0].schedules)
  } catch (error) {
    console.error('Error getting schedules by ID', error)
    return res.status(500).json({ error: 'Error getting schedules by DATE' })
  }
}

async function getSchedulesRange(req: Request, res: Response) {
  const { startDate, endDate } = req.query
  try {
    const models = await CalendarDate.find(
      { date: { $gte: startDate, $lte: endDate } },
      { schedules: 1 }
    )
    return !models ? res.status(200).json([]) : res.status(200).json(models)
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

async function patchSchedules(req: Request, res: Response) {
  const { scheduleId } = req.query
  const { title, start, end } = req.body
  try {
    const filter = {
      'schedules._id': new mongoose.Types.ObjectId(scheduleId as string),
    }
    const query = await CalendarDate.findOne<IDate>(filter)
    if (query?.schedules) {
      const update = {
        schedules: query?.schedules.map((item) => {
          if (item._id.toString() === scheduleId) {
            item.title = title
            item.start = start
            item.end = end
          }
          return item
        }),
      }
      await CalendarDate.updateOne(filter, update).exec()
    }
    return res.status(201).json(query)
  } catch (error) {
    console.error('Error update schedules', error)
    return res.status(500).json({ error: 'Error update schedules' })
  }
}

async function deleteSchedules(req: Request, res: Response) {
  const { scheduleId } = req.query
  try {
    const filter = {
      'schedules._id': new mongoose.Types.ObjectId(scheduleId as string),
    }
    const query = await CalendarDate.findOne<IDate>(filter)
    if (query?.schedules) {
      const update = {
        schedules: query?.schedules.filter(
          (item) => item._id.toString() !== scheduleId
        ),
      }
      await CalendarDate.updateOne(filter, update).exec()
    }
    return res.status(201).json(query)
  } catch (error) {
    console.error('Error delete schedules', error)
    return res.status(500).json({ error: 'Error delte schedules' })
  }
}

export const initRoutesSchedule = (app: Application) => {
  app.get(
    `${BASE_URL}/dates/schedules`,
    async (req: Request, res: Response) => {
      const { date, scheduleId, startDate, endDate } = req.query
      if (date) {
        await getSchedulesByDate(req, res)
      }
      if (scheduleId) {
        await getSchedulesById(req, res)
      }
      if (startDate && endDate) {
        await getSchedulesRange(req, res)
      }
    }
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
  app.patch(
    `${BASE_URL}/dates/schedules`,
    async (req: Request, res: Response) => {
      await patchSchedules(req, res)
    }
  )
  app.delete(
    `${BASE_URL}/dates/schedules`,
    async (req: Request, res: Response) => {
      await deleteSchedules(req, res)
    }
  )
}
