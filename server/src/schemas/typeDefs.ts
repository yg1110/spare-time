import { gql } from 'apollo-server-express'

const typeDefs = gql`
  type Query {
    findCalendarById(diaryId: String, scheduleId: String): Calendar
    findCalendarByDate(
      date: String
      isSchedules: Boolean
      isDiaries: Boolean
    ): Calendars
    findCalendarByRange(start: String, end: String): [Calendars]
  }
  type Mutation {
    insertDiary(date: String, title: String, content: String): [Diary]
    editDiary(diaryId: String, title: String, content: String): [Diary]
    deleteDiaries(diaryId: String): [Diary]
    insertSchedule(
      date: String
      title: String
      start: String
      end: String
    ): [Schedule]
    editSchedules(
      scheduleId: String
      title: String
      start: String
      end: String
    ): [Schedule]
    deleteSchedules(scheduleId: String): [Schedule]
  }
  type Diary {
    title: String
    content: String
  }
  type Schedule {
    title: String
    location: String
    start: String
    end: String
  }
  type Calendar {
    diaries: Diary
    schedules: Schedule
  }
  type Calendars {
    diaries: [Diary]
    schedules: [Schedule]
  }
`

export default typeDefs
