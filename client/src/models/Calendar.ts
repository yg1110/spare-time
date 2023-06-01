import { Dayjs } from 'dayjs'
import { EventInput } from '@fullcalendar/core'

export interface CALENDAR_STATE {
  title: string
  category: string
  schedule: SCHEDULE
  diaries: DIARY
  selectedMenu: string
  selectedDate: Date | undefined
  calendarEvents: EventInput
}

export interface SCHEDULE {
  _id?: string
  start: Dayjs
  end: Dayjs
  updatedAt?: Dayjs
  createAt?: Dayjs
}

export interface DIARY {
  _id?: string
  content: string
  updatedAt?: Dayjs
  createAt?: Dayjs
}
