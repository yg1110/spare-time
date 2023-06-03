import React, { useEffect } from 'react'
import styled from 'styled-components'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin, { DateClickArg } from '@fullcalendar/interaction'
import FullCalendar from '@fullcalendar/react'
import { LANG } from '@/utils/constant'
import {
  calendarEventState,
  calendarTitleState,
  selectedDateState,
  selectedMenuState,
} from '@/state/calendar.state'
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'
import { useCalendarAPI } from '@/hooks/useCalendarAPI'
import { calendarModalState } from '@/state/modal.state'
import { EventClickArg, EventInput } from '@fullcalendar/core'

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
  const { fetchScheduleById } = useCalendarAPI(calendarRef)
  const setSelectedDate = useSetRecoilState<Date | undefined>(selectedDateState)
  const calendarEvent = useRecoilValue<EventInput[]>(calendarEventState)
  const setShowModal = useSetRecoilState<boolean>(calendarModalState)
  const [title, setTitle] = useRecoilState<string>(calendarTitleState)
  const selectedMenu = useRecoilValue<string>(selectedMenuState)

  const onDateSelect = (arg: DateClickArg) => {
    setShowModal(true)
    setSelectedDate(arg.date)
  }

  const onEventClick = async (clickInfo: EventClickArg) => {
    const scheduleId = clickInfo.event.extendedProps._id
    await fetchScheduleById(scheduleId)
  }

  useEffect(() => {
    const calendarApi = calendarRef.current?.getApi()
    if (calendarApi && title === '') {
      setTitle(calendarApi?.view?.title ?? '')
    }
  }, [calendarRef.current])

  console.log(`calendarView`)
  return (
    <Container>
      <FullCalendar
        ref={calendarRef}
        locale={LANG}
        headerToolbar={false}
        selectable={true}
        dayMaxEvents={true}
        events={calendarEvent}
        initialView={selectedMenu}
        eventClick={onEventClick}
        dateClick={onDateSelect}
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
      />
    </Container>
  )
}

export default CalendarView
