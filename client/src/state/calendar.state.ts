import { atom } from 'recoil'
import dayjs from 'dayjs'
import { DATE } from '../models/Calendar'

export const selectedDateState = atom<DATE>({
  key: 'selectedDateState',
  default: {
    title: dayjs(new Date()).format('YYYY년 M월'),
    date: new Date(),
  },
})

export const calendarTitleState = atom<string>({
  key: 'calendarTitle',
  default: '',
})
