import React, { useEffect } from 'react'
import FullCalendar from '@fullcalendar/react'
import { useRecoilState } from 'recoil'
import { calendarTitleState } from '@/state/calendar.state'

export function useCalendar() {
  const calendarRef = React.useRef<FullCalendar>(null)
  const [title, setTitle] = useRecoilState<string>(calendarTitleState)

  useEffect(() => {
    if (calendarRef.current) {
      const calendarApi = calendarRef.current?.getApi()
      if (calendarApi) {
        setTitle(calendarApi?.view?.title ?? '')
      }
    }
  }, [calendarRef.current])

  const handlePrev = () => {
    const calendarApi = calendarRef.current?.getApi()
    if (calendarApi) {
      calendarApi.prev()
      setTitle(calendarApi?.view?.title ?? '')
    }
  }

  const handleNext = () => {
    const calendarApi = calendarRef.current?.getApi()
    if (calendarApi) {
      calendarApi.next()
      setTitle(calendarApi?.view?.title ?? '')
    }
  }

  return { title, handlePrev, handleNext, calendarRef }
}
