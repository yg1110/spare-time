import { atom } from 'recoil'
import { CALENDAR_STATE } from '@/models/Calendar'
import { CALENDAR_VIEW_MODE } from '@/utils/constant'

export const calendarState = atom<CALENDAR_STATE>({
  key: 'calendarState',
  default: {
    title: '',
    calendarEvents: [],
    selectedDate: new Date(),
    selectedMenu: CALENDAR_VIEW_MODE.WEEK,
  },
})
