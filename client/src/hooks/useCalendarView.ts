import React, { useState } from 'react'
import FullCalendar from '@fullcalendar/react'
import { EventClickArg, EventInput } from '@fullcalendar/core'
import { useRecoilState } from 'recoil'
import { DATE } from '@/models/Calendar'
import { selectedDateState } from '@/state/calendar.state'
import { DateClickArg } from '@fullcalendar/interaction'

export function useCalendarView(calendarRef: React.RefObject<FullCalendar>) {
  const [showModal, setShowModal] = useState(false)
  const [calendarEvents, setCalendarEvents] = useState<EventInput[]>([])
  const [selectedDate, setSelectedDate] =
    useRecoilState<DATE>(selectedDateState)

  const handleDateSelect = (arg: DateClickArg) => {
    setShowModal(true)
    setSelectedDate({
      title: arg.dateStr,
      date: arg.date,
    })
  }

  const submitDate = (newEvent: EventInput) => {
    const calendarApi = calendarRef.current?.getApi()
    if (calendarApi) {
      setCalendarEvents([...calendarEvents, newEvent])
      handleModalClose()
    }
  }

  const handleModalClose = () => {
    setShowModal(false)
  }

  function handleEventClick(clickInfo: EventClickArg) {
    console.log(`clickInfo`, clickInfo)

    if (
      confirm(
        `Are you sure you want to delete the event '${clickInfo.event.title}'`
      )
    ) {
      // eventStore.deleteEvent(clickInfo.event.id)
    }
  }

  return {
    showModal,
    selectedDate,
    calendarEvents,
    submitDate,
    handleEventClick,
    handleDateSelect,
    handleModalClose,
  }
}
