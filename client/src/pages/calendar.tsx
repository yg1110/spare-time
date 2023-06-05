import React from 'react'
import styled from 'styled-components'
import CalendarView from '@/component/CalendarView'
import CalendarModal from '@/component/Modal/CalendarModal'
import Nav from '@/component/Nav'
import FullCalendar from '@fullcalendar/react'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
`

interface Props {
  calendarRef: React.RefObject<FullCalendar>
}

const Calendar: React.FC<Props> = ({ calendarRef }) => {
  const changeView = (view: string) => {
    const calendarApi = calendarRef.current?.getApi()
    if (calendarApi) {
      calendarApi?.changeView(view)
    }
  }

  return (
    <Container>
      {/*<CalendarHeader calendarRef={calendarRef} />*/}
      <CalendarView calendarRef={calendarRef} />
      <CalendarModal calendarRef={calendarRef} />
      <Nav changeView={changeView} />
    </Container>
  )
}

export default Calendar
