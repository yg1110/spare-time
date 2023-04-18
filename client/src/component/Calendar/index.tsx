import React, { useState } from 'react'
import styled from 'styled-components'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin, { DateClickArg } from '@fullcalendar/interaction'
import FullCalendar from '@fullcalendar/react'
import CalendarModal from '../Modal/CalendarModal'
import dayjs from 'dayjs'
import { LANG } from '../../utils/Constant'
import { DATE } from '../../models/Calendar'
import { DatesSetArg } from '@fullcalendar/core'
import { useRecoilState } from 'recoil'
import { selectedDateState } from '../../state/calendar.state'
import './calendar.css'

const Container = styled.div`
  display: flex;
  height: calc(100% - 70px);

  & > div {
    width: 100%;
  }
`

const CalendarView: React.FC = () => {
  const [showModal, setShowModal] = useState(false)
  const [selectedDate, setSelectedDate] =
    useRecoilState<DATE>(selectedDateState)

  const handleDateSelect = (event: DateClickArg) => {
    setShowModal(true)
    setSelectedDate({
      title: event.dateStr,
      date: event.date,
    })
  }

  const handleMonthChange = async (event: DatesSetArg) => {
    const month = dayjs(event.start).add(1, 'month')
    const title = month.format('YYYY년 M월 M일')
    setSelectedDate({
      ...selectedDate,
      title: title,
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
        datesSet={handleMonthChange}
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
