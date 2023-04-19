import React, { useState } from 'react'
import styled from 'styled-components'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin, { DateClickArg } from '@fullcalendar/interaction'
import FullCalendar from '@fullcalendar/react'
import CalendarModal from '../Modal/CalendarModal'
import dayjs from 'dayjs'
import { LANG } from '../../utils/constant'
import { DATE } from '../../models/Calendar'
import { DatesSetArg, EventClickArg } from '@fullcalendar/core'
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
        locale={LANG}
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        headerToolbar={{
          left: 'prev,next today',
          center: 'title',
          right: 'dayGridMonth,timeGridWeek,timeGridDay',
        }}
        events={[
          {
            title: 'Event 1',
            start: '2023-04-18T09:00:00',
            end: '2023-04-18T11:00:00',
          },
          {
            title: 'Event 2',
            start: '2023-04-18T13:00:00',
            end: '2023-04-18T15:00:00',
          },
        ]}
        initialView="timeGridDay"
        selectable={true}
        dayMaxEvents={true}
        // datesSet={handleMonthChange}
        eventClick={handleEventClick}
        // dateClick={handleDateSelect}
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
