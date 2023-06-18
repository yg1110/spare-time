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
  union CalendarDates = Calendar | Calendars
`

export default typeDefs
