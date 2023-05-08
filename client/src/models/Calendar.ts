import { Dayjs } from 'dayjs'
import { EventInput } from '@fullcalendar/core'

export interface CALENDAR_STATE {
  title: string
  selectedMenu: string
  selectedDate: Date | undefined
  calendarEvents: EventInput
}

export interface SCHEDULE {
  start: Dayjs
  end: Dayjs
  title: string
}
