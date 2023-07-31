import { gql } from 'apollo-server-express'

const queries = gql`
  type Query {
    findCalendarById(diaryId: String, scheduleId: String): Calendar
    findCalendarByDate(
      date: String
      isSchedules: Boolean
      isDiaries: Boolean
    ): Calendars
    findCalendarByRange(userId: String, start: String, end: String): [Calendars]
  }
`

export default queries
