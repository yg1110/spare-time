import { Dayjs } from 'dayjs'
import { EventInput } from '@fullcalendar/core'

export interface CALENDAR_STATE {
  title: string
  category: string
  schedule: SCHEDULE
  selectedMenu: string
  selectedDate: Date | undefined
  calendarEvents: EventInput
}

export interface SCHEDULE {
  _id?: string
  start: Dayjs
  end: Dayjs
  title: string
  updatedAt?: Dayjs
  createAt?: Dayjs
}
