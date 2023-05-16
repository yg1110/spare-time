import React, { useEffect } from 'react'
import FullCalendar from '@fullcalendar/react'
import { useRecoilState } from 'recoil'
import { CALENDAR_STATE } from '@/models/Calendar'
import { calendarState } from '@/state/calendar.state'
import { useCalendarAPI } from '@/hooks/useCalendarAPI'

export function useCalendar(calendarRef: React.RefObject<FullCalendar>) {
  const { fetchScheduleRange } = useCalendarAPI(calendarRef)
  const [calendar, setCalendar] = useRecoilState<CALENDAR_STATE>(calendarState)

  useEffect(() => {
    fetchScheduleRange()
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
      // await fetchScheduleRange()
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
      // await fetchScheduleRange()
      setCalendar({
        ...calendar,
        title: calendarApi?.view?.title ?? '',
      })
    }
  }

  return { calendar, handlePrev, handleNext }
}
