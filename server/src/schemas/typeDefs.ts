import { gql } from 'apollo-server-express'

const typeDefs = gql`
  type Query {
    findDateById(diaryId: String, scheduleId: String): Dates
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
  type Date {
    diaries: Diary
    schedules: Schedule
  }
  union Dates = Diary | Schedule | Date
`

export default typeDefs
