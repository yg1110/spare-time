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
    console.error('getSchedulesByDate ERROR : ', error)
    return res.status(500).json({
      error: '선택한 날짜의 일정을 불러오는 와중에 에러가 발생했습니다.',
    })
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
    console.error('getSchedulesById ERROR : ', error)
    return res.status(500).json({
      error: '선택한 아이디의 일정을 불러오는 와중에 에러가 발생했습니다.',
    })
  }
}

async function getSchedulesRange(req: Request, res: Response) {
  const { startDate, endDate } = req.query
  try {
    const models = await CalendarDate.find(
      { date: { $gte: startDate, $lte: endDate } },
      { schedules: 1, date: 1 }
    )
    return !models ? res.status(200).json([]) : res.status(200).json(models)
  } catch (error) {
    console.error('getSchedulesRange ERROR : ', error)
    return res.status(500).json({
      error: '선택한 날짜 범위내의 일정을 불러오는 와중에 에러가 발생했습니다.',
    })
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
    console.error('addSchedules ERROR : ', error)
    res.status(500).json({ error: '일정을 추가하던 도중 에러가 발생했습니다.' })
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
    console.error('createSchedules ERROR : ', error)
    res.status(500).json({ error: '일정을 추가하던 도중 에러가 발생했습니다.' })
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
    console.error('patchSchedules ERROR : ', error)
    return res
      .status(500)
      .json({ error: '일정 정보 업데이트 도중 에러가 발생했습니다.' })
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
    console.error('deleteSchedules ERROR : ', error)
    return res
      .status(500)
      .json({ error: '일정 정보 삭제하던 도중 에러가 발생했습니다.' })
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
      const date = dayjs(req.body.date).format('YYYY-MM-DD')
      console.log(`date`, date)
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
