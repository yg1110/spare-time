import React from 'react'
import FullCalendar from '@fullcalendar/react'
import { EventClickArg } from '@fullcalendar/core'
import { useRecoilState } from 'recoil'
import { calendarState } from '@/state/calendar.state'
import { DateClickArg } from '@fullcalendar/interaction'
import { calendarModalState } from '@/state/modal.state'
import { CALENDAR_STATE } from '@/models/Calendar'
import { useCalendarAPI } from '@/hooks/useCalendarAPI'

export function useCalendarView(calendarRef: React.RefObject<FullCalendar>) {
  const { fetchScheduleById } = useCalendarAPI(calendarRef)
  const [showModal, setShowModal] = useRecoilState<boolean>(calendarModalState)
  const [calendar, setCalendar] = useRecoilState<CALENDAR_STATE>(calendarState)

  const handleDateSelect = (arg: DateClickArg) => {
    setShowModal(true)
    setCalendar({
      ...calendar,
      selectedDate: arg.date,
    })
  }

  const handleEventClick = async (clickInfo: EventClickArg) => {
    const scheduleId = clickInfo.event.extendedProps._id
    await fetchScheduleById(scheduleId)
  }

  return {
    showModal,
    calendar,
    handleEventClick,
    handleDateSelect,
  }
}
