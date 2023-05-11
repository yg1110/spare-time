import dayjs from 'dayjs'
import { atom } from 'recoil'
import { CALENDAR_STATE } from '@/models/Calendar'
import { CALENDAR_VIEW_MODE, CATEGORY } from '@/utils/constant'

const INIT_SCHEDULE = {
  title: '',
  start: dayjs().startOf('day'),
  end: dayjs().endOf('day'),
}
export const calendarState = atom<CALENDAR_STATE>({
  key: 'calendarState',
  default: {
    title: '',
    calendarEvents: [],
    schedule: INIT_SCHEDULE,
    selectedDate: new Date(),
    selectedMenu: CALENDAR_VIEW_MODE.WEEK,
    category: CATEGORY.SCHEDULE.name,
  },
})
