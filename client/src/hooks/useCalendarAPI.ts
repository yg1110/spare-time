import { createSchedules, getSchedules } from '@/services/schedules.service'
import { CALENDAR_STATE } from '@/models/Calendar'
import { useRecoilState } from 'recoil'
import { EventInput } from '@fullcalendar/core'
import { calendarState } from '@/state/calendar.state'
import dayjs from 'dayjs'
import React from 'react'
import FullCalendar from '@fullcalendar/react'

export function useCalendarAPI(calendarRef: React.RefObject<FullCalendar>) {
  const [calendar, setCalendar] = useRecoilState<CALENDAR_STATE>(calendarState)

  const fetchSchedule = async () => {
    const calendarApi = calendarRef.current?.getApi()
    if (calendarApi) {
      const date = dayjs(calendarApi.getDate()).format('YYYY-MM-DD')
      const schedule = await getSchedules<EventInput[]>(date)
      if (schedule && schedule.length > 0) {
        setCalendar({
          ...calendar,
          calendarEvents: schedule,
        })
      }
    }
  }

  const createSchedule = async (schedule: EventInput) => {
    const res = await createSchedules(schedule)
    if (res) {
      await fetchSchedule()
    } else {
      alert(res)
    }
  }

  return { fetchSchedule, createSchedule }
}
