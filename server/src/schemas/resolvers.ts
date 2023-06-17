import mongoose from 'mongoose'
import CalendarDate from '../db/models/date'
import { isEmptyObject } from '../utils'

/*
query findDateById {
  findDateById(diaryId: "647f5a9b8ac3daa0db0c2ad9", scheduleId: "648c569c18ffcf733bb0146c") {
    ... on Diary {
      title
    }
    ... on Schedule {
      title
    }
    ... on Date {
      diaries {
        title
      }
      schedules {
        title
      }
    }
  }
}
*/

const resolvers = {
  Query: {
    findDateById: async (
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
          console.error('getSchedulesById ERROR : ', error)
          return {
            error:
              '선택한 아이디의 일정을 불러오는 와중에 에러가 발생했습니다.',
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
          console.error('getDiariesById ERROR : ', error)
          return {
            error:
              '선택한 아이디의 일기를 불러오는 와중에 에러가 발생했습니다.',
          }
        }
      }

      return output
    },
  },
  Dates: {
    __resolveType(date: any) {
      const isEmptySchedules = isEmptyObject(date.schedules)
      const isEmptyDiary = isEmptyObject(date.diaries)
      if (!isEmptySchedules && isEmptyDiary) {
        return 'Diary'
      }
      if (isEmptySchedules && !isEmptyDiary) {
        return 'Schedule'
      }
      if (!isEmptySchedules && !isEmptyDiary) {
        return 'Date'
      }
      if (isEmptySchedules && isEmptyDiary) {
        return null
      }
    },
  },
}

export default resolvers
