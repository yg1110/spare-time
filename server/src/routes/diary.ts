import dayjs from 'dayjs'
import mongoose from 'mongoose'
import CalendarDate, { IDate } from '../models/date'
import { Application, Request, Response } from 'express'
import { BASE_URL } from '../config'
import Diary, { IDiary } from '../models/diary'

async function getDiariesByDate(req: Request, res: Response) {
  const { date } = req.query
  try {
    const models = await CalendarDate.findOne({ date }).exec()
    return !models
      ? res.status(200).json([])
      : res.status(200).json(models.diaries)
  } catch (error) {
    console.error('Error getting diaries by DATE', error)
    return res.status(500).json({ error: 'Error getting diaries by DATE' })
  }
}

async function getDiariesById(req: Request, res: Response) {
  const { diaryId } = req.query
  console.log(`diaryId`, diaryId)
  const id = new mongoose.Types.ObjectId(diaryId as string)
  try {
    const models = await CalendarDate.aggregate([
      { $unwind: '$diaries' },
      { $match: { 'diaries._id': id } },
    ])
    return !models
      ? res.status(200).json([])
      : res.status(200).json(models[0].diaries)
  } catch (error) {
    console.error('Error getting diaries by ID', error)
    return res.status(500).json({ error: 'Error getting diaries by DATE' })
  }
}

async function getDiariesRange(req: Request, res: Response) {
  const { startDate, endDate } = req.query
  try {
    const models = await CalendarDate.find(
      { date: { $gte: startDate, $lte: endDate } },
      { diaries: 1, date: 1 }
    )
    return !models ? res.status(200).json([]) : res.status(200).json(models)
  } catch (error) {
    console.error('Error getting diaries by ID', error)
    return res.status(500).json({ error: 'Error getting diaries by DATE' })
  }
}

async function addDiaries(model: IDate, req: Request, res: Response) {
  const { title, content } = req.body
  if (model.diaries) {
    const diaries: IDiary = new Diary({
      title,
      content,
    })
    model.diaries = [...model.diaries, diaries]
  }
  try {
    const updatedDiaries = await model.save()
    res.status(201).json(updatedDiaries)
  } catch (error) {
    console.error('Error update diaries', error)
    res.status(500).json({ error: 'Error update diaries' })
  }
}

async function createDiaries(date: string, req: Request, res: Response) {
  const { title, content } = req.body
  const diaries: IDiary = new Diary({
    title,
    content,
  })
  const dates: IDate = new CalendarDate({
    date: date,
    diaries: diaries,
  })
  try {
    const savedDate = await dates.save()
    res.status(201).json(savedDate)
  } catch (error) {
    console.error('Error saving diaries', error)
    res.status(500).json({ error: 'Error saving diaries' })
  }
}

async function patchDiaries(req: Request, res: Response) {
  const { diaryId } = req.query
  const { title, content } = req.body
  try {
    const filter = {
      'diaries._id': new mongoose.Types.ObjectId(diaryId as string),
    }
    const query = await CalendarDate.findOne<IDate>(filter)
    if (query?.diaries) {
      const update = {
        diaries: query?.diaries.map((item) => {
          if (item._id.toString() === diaryId) {
            item.title = title
            item.content = content
          }
          return item
        }),
      }
      await CalendarDate.updateOne(filter, update).exec()
    }
    return res.status(201).json(query)
  } catch (error) {
    console.error('Error update diaries', error)
    return res.status(500).json({ error: 'Error update diaries' })
  }
}

async function deleteDiaries(req: Request, res: Response) {
  const { diaryId } = req.query
  try {
    const filter = {
      'diaries._id': new mongoose.Types.ObjectId(diaryId as string),
    }
    const query = await CalendarDate.findOne<IDate>(filter)
    if (query?.diaries) {
      const update = {
        diaries: query?.diaries.filter(
          (item) => item._id.toString() !== diaryId
        ),
      }
      await CalendarDate.updateOne(filter, update).exec()
    }
    return res.status(201).json(query)
  } catch (error) {
    console.error('Error delete diaries', error)
    return res.status(500).json({ error: 'Error delete diaries' })
  }
}

export const initRoutesDiary = (app: Application) => {
  app.get(`${BASE_URL}/dates/diaries`, async (req: Request, res: Response) => {
    const { date, diaryId, startDate, endDate } = req.query
    if (date) {
      await getDiariesByDate(req, res)
    }
    if (diaryId) {
      await getDiariesById(req, res)
    }
    if (startDate && endDate) {
      await getDiariesRange(req, res)
    }
  })
  app.post(`${BASE_URL}/dates/diaries`, async (req: Request, res: Response) => {
    const date = dayjs(req.body.date).format('YYYY-MM-DD')
    const model = await CalendarDate.findOne({ date }).exec()
    return model ? addDiaries(model, req, res) : createDiaries(date, req, res)
  })
  app.patch(
    `${BASE_URL}/dates/diaries`,
    async (req: Request, res: Response) => {
      await patchDiaries(req, res)
    }
  )
  app.delete(
    `${BASE_URL}/dates/diaries`,
    async (req: Request, res: Response) => {
      await deleteDiaries(req, res)
    }
  )
}
