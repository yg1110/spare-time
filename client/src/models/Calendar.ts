import { Dayjs } from 'dayjs'

export interface DATE {
  title: string
  date: Date | undefined
}

export interface TIME {
  startTime: Dayjs
  endTime: Dayjs
  category: string
}
