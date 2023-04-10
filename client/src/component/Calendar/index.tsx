import React, { useState } from 'react'
import dayjs from 'dayjs'
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

  const handleDateTimeAccept = (date: Date | null) => {
    if (date) {
      console.log('Selected date and time:', dayjs(date).format())
    } else {
      console.log('No date and time selected')
    }
  }

  const handleEventClick = (event: any) => {
    const date = dayjs(event.date).format()
    console.log(`arg`, date)
    // setSelectedEvent(arg.event)
  }

  const handleDateSelect = (event: DateClickArg) => {
    setShowModal(true)
    setSelectedDate({
      title: event.dateStr,
      date: event.date,
    })
  }

  const handleEventAdd = () => {
    setShowModal(false)
    setSelectedDate({
      title: '',
      date: undefined,
    })
  }

  const handleEventCancel = () => {
    setShowModal(false)
    setSelectedDate({
      title: '',
      date: undefined,
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
      {/*{showModal ? (*/}
      {/*  <div className="modal">*/}
      {/*    <div className="modal-content">*/}
      {/*      <span className="close" onClick={handleEventCancel}>*/}
      {/*        &times;*/}
      {/*      </span>*/}
      {/*      <h2>Add Event</h2>*/}
      {/*      <form onSubmit={handleEventAdd}>*/}
      {/*        <label>Title</label>*/}
      {/*        <input*/}
      {/*          type="text"*/}
      {/*          value={event.title}*/}
      {/*          onChange={(e) => setEvent({ ...event, title: e.target.value })}*/}
      {/*        />*/}
      {/*        <label>Start Time</label>*/}
      {/*        <input*/}
      {/*          type="text"*/}
      {/*          value={dayjs(event.start).format('YYYY-MM-DD HH:mm:ss')}*/}
      {/*          readOnly*/}
      {/*        />*/}
      {/*        <label>End Time</label>*/}
      {/*        <input*/}
      {/*          type="text"*/}
      {/*          value={dayjs(event.end).format('YYYY-MM-DD HH:mm:ss')}*/}
      {/*          readOnly*/}
      {/*        />*/}
      {/*        <button type="submit">Save</button>*/}
      {/*      </form>*/}
      {/*    </div>*/}
      {/*  </div>*/}
      {/*) : null}*/}
      {/*<LocalizationProvider dateAdapter={AdapterDayjs} locale={koLocale}>*/}
      {/*<MobileTimePicker onAccept={handleDateAccept} />*/}
      {/*<MobileTimePicker onAccept={handleDateAccept} />*/}
      {/*</LocalizationProvider>*/}
    </Container>
  )
}

export default Index
