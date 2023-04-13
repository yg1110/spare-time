import React, { useState } from 'react'
import styled from 'styled-components'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin, { DateClickArg } from '@fullcalendar/interaction'
import FullCalendar from '@fullcalendar/react'
import CalendarModal from '../Modal/CalendarModal'
import { LANG } from '../../common/utils/Constant'
import { CALENDAR_DATE } from '../../common/type/Calendar'

const Container = styled.div`
  display: flex;
  height: 100vh;
  width: 100vw;

  & > div {
    width: 100%;
  }
`

const Index: React.FC = () => {
  const [showModal, setShowModal] = useState(false)
  const [selectedDate, setSelectedDate] = useState<CALENDAR_DATE>({
    title: '',
    date: undefined,
  })

  const handleDateSelect = (event: DateClickArg) => {
    setShowModal(true)
    setSelectedDate({
      title: event.dateStr,
      date: event.date,
    })
  }

  const handleModalClose = (e: React.MouseEvent<HTMLElement>) => {
    setShowModal(false)
  }

  return (
    <Container>
      <FullCalendar
        locale={LANG}
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        selectable={true}
        dateClick={handleDateSelect}
      />
      <CalendarModal
        showModal={showModal}
        selectedDate={selectedDate}
        closeEvent={handleModalClose}
      />
    </Container>
  )
}

export default Index
