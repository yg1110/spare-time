import { gql } from 'apollo-server-express'

const types = gql`
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

export default types
