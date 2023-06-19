import { gql } from '@apollo/client'

export const INSERT_SCHEDULE = gql`
  mutation InsertSchedule(
    $date: String
    $title: String
    $start: String
    $end: String
  ) {
    insertSchedule(date: $date, title: $title, start: $start, end: $end) {
      _id
      end
      start
      title
    }
  }
`

export const EDIT_SCHEDULE = gql`
  mutation EditSchedules(
    $scheduleId: String
    $title: String
    $start: String
    $end: String
  ) {
    editSchedules(
      scheduleId: $scheduleId
      title: $title
      start: $start
      end: $end
    ) {
      _id
      end
      title
      start
    }
  }
`

export const DELETE_SCHEDULE = gql`
  mutation DeleteSchedules($scheduleId: String) {
    deleteSchedules(scheduleId: $scheduleId) {
      _id
      end
      title
      start
    }
  }
`

export const INSERT_DIARY = gql`
  mutation InsertDiary($date: String, $title: String, $content: String) {
    insertDiary(date: $date, title: $title, content: $content) {
      _id
      content
      title
    }
  }
`

export const EDIT_DIARY = gql`
  mutation EditDiary($diaryId: String, $title: String, $content: String) {
    editDiary(diaryId: $diaryId, title: $title, content: $content) {
      _id
      content
      title
    }
  }
`

export const DELETE_DIARY = gql`
  mutation DeleteDiaries($diaryId: String) {
    deleteDiaries(diaryId: $diaryId) {
      _id
      content
      title
    }
  }
`
