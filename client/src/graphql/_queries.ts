import { gql } from '@apollo/client'

export const GET_DATE_RANGE = gql`
  query FindCalendarByRange($userId: String, $start: String, $end: String) {
    findCalendarByRange(userId: $userId, start: $start, end: $end) {
      date
      userId
      schedules {
        _id
        start
        title
        end
      }
      diaries {
        _id
        content
        title
      }
    }
  }
`

export const GET_DIARY_ID = gql`
  query FindCalendarById($diaryId: String) {
    findCalendarById(diaryId: $diaryId) {
      diaries {
        _id
        content
        title
      }
    }
  }
`

export const GET_SCHEDULE_ID = gql`
  query FindCalendarById($scheduleId: String) {
    findCalendarById(scheduleId: $scheduleId) {
      schedules {
        _id
        title
        start
        end
      }
    }
  }
`
