import React, { useEffect } from 'react'
import FullCalendar from '@fullcalendar/react'
import { useRecoilState } from 'recoil'
import { CALENDAR_STATE } from '@/models/Calendar'
import { calendarState } from '@/state/calendar.state'
import { useCalendarAPI } from '@/hooks/useCalendarAPI'

export function useCalendar(calendarRef: React.RefObject<FullCalendar>) {
  const { fetchSchedule } = useCalendarAPI(calendarRef)
  const [calendar, setCalendar] = useRecoilState<CALENDAR_STATE>(calendarState)

  useEffect(() => {
    fetchSchedule()
  }, [])

  useEffect(() => {
    const calendarApi = calendarRef.current?.getApi()
    if (calendarApi) {
      setCalendar({
        ...calendar,
        title: calendarApi?.view?.title ?? '',
      })
    }
  }, [calendarRef.current])

  const handlePrev = async () => {
    const calendarApi = calendarRef.current?.getApi()
    if (calendarApi) {
      calendarApi.prev()
      await fetchSchedule()
      setCalendar({
        ...calendar,
        title: calendarApi?.view?.title ?? '',
      })
    }
  }

  const handleNext = async () => {
    const calendarApi = calendarRef.current?.getApi()
    if (calendarApi) {
      calendarApi.next()
      await fetchSchedule()
      setCalendar({
        ...calendar,
        title: calendarApi?.view?.title ?? '',
      })
    }
  }

  return { calendar, handlePrev, handleNext }
}
