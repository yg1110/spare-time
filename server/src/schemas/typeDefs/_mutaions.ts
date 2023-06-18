import { gql } from 'apollo-server-express'

const mutations = gql`
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
`

export default mutations
