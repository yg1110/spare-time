import mongoose from 'mongoose'
import CalendarDate from '../../db/models/date'

export const findCalendarById = async (
  _: string,
  args: { diaryId: string; scheduleId: string }
) => {
  const { diaryId, scheduleId } = args
  const output = {
    schedules: {},
    diaries: {},
  }
  if (scheduleId) {
    const id = new mongoose.Types.ObjectId(scheduleId as string)
    try {
      const models = await CalendarDate.aggregate([
        { $unwind: '$schedules' },
        { $match: { 'schedules._id': id } },
      ])
      output.schedules = models?.[0]?.schedules ?? {}
    } catch (error) {
      console.error('findCalendarById scheduleId ERROR : ', error)
      return {
        error: '선택한 아이디의 일정을 불러오는 와중에 에러가 발생했습니다.',
      }
    }
  }
  if (diaryId) {
    const id = new mongoose.Types.ObjectId(diaryId as string)
    try {
      const models = await CalendarDate.aggregate([
        { $unwind: '$diaries' },
        { $match: { 'diaries._id': id } },
      ])
      output.diaries = models?.[0]?.diaries ?? {}
    } catch (error) {
      console.error('findCalendarById diaryId ERROR : ', error)
      return {
        error: '선택한 아이디의 일기를 불러오는 와중에 에러가 발생했습니다.',
      }
    }
  }
  return output
}

export const findCalendarByDate = async (
  _: string,
  args: {
    date: string
    isSchedules: boolean
    isDiaries: boolean
  }
) => {
  const { date, isSchedules, isDiaries } = args
  const output = {
    schedules: {},
    diaries: {},
  }
  try {
    const models = await CalendarDate.findOne({ date }).exec()
    if (isSchedules) {
      output.schedules = models?.schedules ?? []
    }
    if (isDiaries) {
      output.diaries = models?.diaries ?? []
    }
  } catch (error) {
    console.error('findCalendarByDate ERROR : ', error)
    return {
      error: '선택한 날짜의 일정을 불러오는 와중에 에러가 발생했습니다.',
    }
  }
  return output
}

export const findCalendarByRange = async (
  _: string,
  args: {
    start: string
    end: string
  }
) => {
  const { start, end } = args
  try {
    const models = await CalendarDate.find({
      date: { $gte: start, $lte: end },
    })
    return models
  } catch (error) {
    console.error('findCalendarByRange ERROR : ', error)
    return {
      error: '선택한 날짜의 일정을 불러오는 와중에 에러가 발생했습니다.',
    }
  }
}
