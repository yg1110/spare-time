import dayjs from 'dayjs'
import { atom } from 'recoil'
import { DIARY, SCHEDULE } from '@/types/Calendar'
import { CALENDAR_VIEW_MODE } from '@/utils/constant'
import { EventInput } from '@fullcalendar/core'

const INIT_SCHEDULE: SCHEDULE = {
  title: '',
  start: dayjs().startOf('day'),
  end: dayjs().endOf('day'),
}

const INIT_DIARY: DIARY = {
  title: '',
  content: '',
}

export const calendarEventState = atom<EventInput[]>({
  key: 'calendarEventState',
  default: [],
})

export const selectedDateState = atom<Date | undefined>({
  key: 'selectedDateState',
  default: new Date(),
})

export const scheduleState = atom<typeof INIT_SCHEDULE>({
  key: 'calendarState',
  default: INIT_SCHEDULE,
})

export const diaryState = atom<typeof INIT_DIARY>({
  key: 'diaryState',
  default: INIT_DIARY,
})

export const calendarTitleState = atom<string>({
  key: 'calendarTitleState',
  default: '',
})

export const selectedMenuState = atom<string>({
  key: 'selectedMenuState',
  default: CALENDAR_VIEW_MODE.WEEK,
})
