import React, { useState } from 'react'
import styled from 'styled-components'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin, { DateClickArg } from '@fullcalendar/interaction'
import FullCalendar from '@fullcalendar/react'
import CalendarModal from '../Modal/CalendarModal'
import { LANG } from '../../utils/Constant'
import { DATE } from '../../models/Calendar'

const Container = styled.div`
  display: flex;
  height: 100%;

  & > div {
    width: 100%;
  }
`

const CalendarView: React.FC = () => {
  const [showModal, setShowModal] = useState(false)
  const [selectedDate, setSelectedDate] = useState<DATE>({
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

  const handleModalClose = () => {
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

export default CalendarView
