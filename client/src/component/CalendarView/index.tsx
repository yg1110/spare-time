import React from 'react'
import styled from 'styled-components'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import FullCalendar from '@fullcalendar/react'
import { LANG } from '@/utils/constant'
import { useCalendarView } from '@/hooks/useCalendarView'
import { useRecoilValue } from 'recoil'
import { calendarState } from '@/state/calendar.state'
import { CALENDAR_STATE } from '@/models/Calendar'

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
  const { calendarEvents, selectedMenu } =
    useRecoilValue<CALENDAR_STATE>(calendarState)
  const { handleEventClick, handleDateSelect } = useCalendarView()
  return (
    <Container>
      <FullCalendar
        ref={calendarRef}
        locale={LANG}
        headerToolbar={false}
        selectable={true}
        dayMaxEvents={true}
        events={calendarEvents}
        initialView={selectedMenu}
        eventClick={handleEventClick}
        dateClick={handleDateSelect}
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
      />
    </Container>
  )
}

export default CalendarView
