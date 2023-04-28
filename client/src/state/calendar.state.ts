import { atom } from 'recoil'
import dayjs from 'dayjs'
import { CALENDAR_VIEW, DATE } from '../models/Calendar'

export const selectedDateState = atom<DATE>({
  key: 'selectedDateState',
  default: {
    title: dayjs(new Date()).format('YYYY년 M월'),
    date: new Date(),
  },
})

export const initialViewState = atom<CALENDAR_VIEW>({
  key: 'initialView',
  default: {
    type: 'timeGridDay',
  },
})
