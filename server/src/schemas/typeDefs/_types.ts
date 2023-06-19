import { gql } from 'apollo-server-express'

const types = gql`
  type Diary {
    _id: ID
    title: String
    content: String
  }
  type Schedule {
    _id: ID
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

export default types
