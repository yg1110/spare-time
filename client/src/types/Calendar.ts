import { Dayjs } from 'dayjs'

export interface DATES {
  _id?: string
  date: string
  schedules: SCHEDULE[]
  diaries: DIARY[]
}

export interface SCHEDULE {
  _id?: string
  title: string
  start: Dayjs
  end: Dayjs
  updatedAt?: Dayjs
  createAt?: Dayjs
}

export interface DIARY {
  _id?: string
  title: string
  content: string
  updatedAt?: Dayjs
  createAt?: Dayjs
}
