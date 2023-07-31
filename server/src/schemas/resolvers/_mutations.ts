import CalendarDate, { IDate } from '../../db/models/date'
import Diary, { IDiary } from '../../db/models/diary'
import dayjs from 'dayjs'
import Schedule, { ISchedule } from '../../db/models/schedule'
import mongoose from 'mongoose'

async function addDiaries(
  model: IDate,
  body: { title: string; content: string }
) {
  if (model.diaries) {
    const { title, content } = body
    const diaries: IDiary = new Diary({
      title,
      content,
    })
    model.diaries = [...model.diaries, diaries]
  }
  try {
    const updatedDiaries = await model.save()
    return updatedDiaries.diaries
  } catch (error) {
    console.error('addDiaries ERROR : ', error)
    return {
      error: '일기를 추가하던 도중 에러가 발생했습니다.',
    }
  }
}

async function createDiaries(
  date: string,
  body: { userId: string; title: string; content: string }
) {
  const { userId, title, content } = body
  const diaries: IDiary = new Diary({
    title,
    content,
  })
  const dates: IDate = new CalendarDate({
    date: date,
    userId: userId,
    diaries: diaries,
  })
  try {
    const savedDate = await dates.save()
    return savedDate.diaries
  } catch (error) {
    console.error('createDiaries ERROR : ', error)
    return { error: '일기를 추가하던 도중 에러가 발생했습니다.' }
  }
}

async function addSchedule(
  model: IDate,
  body: { title: string; start: string; end: string }
) {
  const { title, start, end } = body
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
    return updatedSchedule.schedules
  } catch (error) {
    console.error('addSchedules ERROR : ', error)
    return { error: '일정을 추가하던 도중 에러가 발생했습니다.' }
  }
}

async function createSchedule(
  date: string,
  body: { userId: string; title: string; start: string; end: string }
) {
  const { userId, title, start, end } = body
  const schedule: ISchedule = new Schedule({
    title,
    start,
    end,
  })
  const dates: IDate = new CalendarDate({
    date: date,
    userId: userId,
    schedules: schedule,
  })
  try {
    const savedDate = await dates.save()
    return savedDate.schedules
  } catch (error) {
    console.error('createSchedules ERROR : ', error)
    return { error: '일정을 추가하던 도중 에러가 발생했습니다.' }
  }
}

export const insertDiary = async (
  _: string,
  args: {
    date: string
    userId: string
    title: string
    content: string
  }
) => {
  const date = dayjs(args.date).format('YYYY-MM-DD')
  const userId = args.userId
  const model = await CalendarDate.findOne({ userId, date }).exec()
  return model ? addDiaries(model, args) : createDiaries(date, args)
}

export const insertSchedule = async (
  _: string,
  args: {
    date: string
    userId: string
    title: string
    start: string
    end: string
  }
) => {
  const date = dayjs(args.date).format('YYYY-MM-DD')
  const userId = args.userId
  const model = await CalendarDate.findOne({ userId, date }).exec()
  return model ? addSchedule(model, args) : createSchedule(date, args)
}

export const editDiary = async (
  _: string,
  args: {
    date: string
    diaryId: string
    title: string
    content: string
  }
) => {
  const { date, diaryId, title, content } = args
  try {
    const filter = {
      'diaries._id': new mongoose.Types.ObjectId(diaryId as string),
    }
    const query = await CalendarDate.findOne<IDate>(filter)
    if (query?.diaries) {
      const update = {
        date: date,
        diaries: query?.diaries.map((item) => {
          if (item._id.toString() === diaryId) {
            item.title = title
            item.content = content
          }
          return item
        }),
      }
      await CalendarDate.updateOne(filter, update).exec()
      return update.diaries
    }
    return {}
  } catch (error) {
    console.error('editDiary ERROR : ', error)
    return { error: '일기 정보 업데이트 도중 에러가 발생했습니다.' }
  }
}

export const editSchedules = async (
  _: string,
  args: {
    scheduleId: string
    title: string
    start: string
    end: string
  }
) => {
  const { scheduleId, title, start, end } = args
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
      return update.schedules
    }
    return {}
  } catch (error) {
    console.error('editSchedules ERROR : ', error)
    return { error: '일기 정보 업데이트 도중 에러가 발생했습니다.' }
  }
}

export const deleteSchedules = async (
  _: string,
  args: {
    scheduleId: string
  }
) => {
  const { scheduleId } = args
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
      return update.schedules
    }
    return {}
  } catch (error) {
    console.error('deleteSchedules ERROR : ', error)
    return { error: '일정 정보 삭제하던 도중 에러가 발생했습니다.' }
  }
}

export const deleteDiaries = async (
  _: string,
  args: {
    diaryId: string
  }
) => {
  const { diaryId } = args
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
      return update.diaries
    }
    return {}
  } catch (error) {
    console.error('deleteDiaries ERROR : ', error)
    return { error: '일기 정보 삭제하던 도중 에러가 발생했습니다.' }
  }
}
