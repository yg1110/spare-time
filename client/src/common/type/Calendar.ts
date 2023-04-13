import { Dayjs } from 'dayjs'

export interface CALENDAR_DATE {
  title: string
  date: Date | undefined
}

export interface CALENDAR_TIME {
  startTime: Dayjs
  endTime: Dayjs
}
