import React, { useState } from 'react'
import styled from 'styled-components'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin, { DateClickArg } from '@fullcalendar/interaction'
import FullCalendar from '@fullcalendar/react'
import CalendarModal from '@/component/Modal/CalendarModal'
import { EventClickArg, EventInput } from '@fullcalendar/core'
import { useRecoilState } from 'recoil'
import { DATE } from '@/models/Calendar'
import { CALENDAR_VIEW_MODE, LANG } from '@/utils/constant'
import { selectedDateState } from '@/state/calendar.state'

const Container = styled.div`
  display: flex;
  height: calc(100% - 70px);

  & > div {
    width: 100%;
  }
`

interface Props {
  calendarRef: React.RefObject<FullCalendar>
}

const CalendarView: React.FC<Props> = ({ calendarRef }) => {
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

  return (
    <Container>
      <FullCalendar
        ref={calendarRef}
        locale={LANG}
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        headerToolbar={false}
        events={calendarEvents}
        initialView={CALENDAR_VIEW_MODE.DAY}
        selectable={true}
        dayMaxEvents={true}
        eventClick={handleEventClick}
        dateClick={handleDateSelect}
      />
      <CalendarModal
        showModal={showModal}
        selectedDate={selectedDate}
        submitEvent={submitDate}
        closeEvent={handleModalClose}
      />
    </Container>
  )
}

export default CalendarView
