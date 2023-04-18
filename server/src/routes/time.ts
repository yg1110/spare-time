import { Application, Request, Response } from 'express'
import Time, { ITime } from '../models/time'
import dayjs, { Dayjs } from 'dayjs'

function settingHours(
  startTime: Dayjs,
  endTime: Dayjs,
  hours?: number[]
): number[] {
  const startHour = dayjs(startTime).hour()
  const endHour = dayjs(endTime).hour()
  const startMin = dayjs(startTime).minute()
  const endMin = dayjs(endTime).minute()
  if (!hours) {
    hours = Array.from({ length: 24 }).fill(0) as number[]
  }
  for (let i = startHour + 1; i < endHour; i++) {
    hours[i] += 1
  }
  hours[startHour] += Number(((60 - startMin) / 60).toFixed(2))
  hours[endHour] += Number((endMin / 60).toFixed(2))
  return hours
}

async function createdTimeModel(
  res: Response,
  category: string,
  startTime: Dayjs,
  endTime: Dayjs
) {
  const time: ITime = new Time({
    date: dayjs(startTime).format('YYYY-MM-DD'),
    category,
    startTime,
    endTime,
    hours: settingHours(startTime, endTime),
  })
  try {
    await time.save()
    res.status(201).json(true)
  } catch (error) {
    console.error('Error saving todo', error)
    res.status(500).json({ error: 'Error saving todo' })
  }
}

async function updateTimeModelHours(
  res: Response,
  timeModel: ITime,
  startTime: Dayjs,
  endTime: Dayjs
) {
  try {
    timeModel.hours = settingHours(startTime, endTime, timeModel.hours)
    await timeModel.save()
    res.status(200).json(true)
  } catch (error) {
    console.error('Error saving todo', error)
    res.status(500).json({ error: 'Error saving todo' })
  }
}

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
    const timeModel: ITime | null = await Time.findOne({
      date: dayjs(startTime).format('YYYY-MM-DD'),
    }).exec()
    return !timeModel
      ? await createdTimeModel(res, category, startTime, endTime)
      : await updateTimeModelHours(res, timeModel, startTime, endTime)
  })
}
