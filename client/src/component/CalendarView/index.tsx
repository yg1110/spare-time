import React from 'react'
import styled from 'styled-components'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import FullCalendar from '@fullcalendar/react'
import CalendarModal from '@/component/Modal/CalendarModal'
import { CALENDAR_VIEW_MODE, LANG } from '@/utils/constant'
import { useCalendarView } from '@/hooks/useCalendarView'

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
  const {
    showModal,
    selectedDate,
    calendarEvents,
    submitDate,
    handleEventClick,
    handleDateSelect,
    handleModalClose,
  } = useCalendarView(calendarRef)
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
