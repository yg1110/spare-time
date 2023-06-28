import React, { useEffect } from 'react'
import styled from 'styled-components'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin, { DateClickArg } from '@fullcalendar/interaction'
import FullCalendar from '@fullcalendar/react'
import { LANG, SIDE_MENU_TYPE } from '@/utils/constant'
import {
  calendarEventState,
  calendarTitleState,
  selectedDateState,
  selectedMenuState,
} from '@/state/calendar.state'
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'
import { useScheduleAPI } from '@/hooks/useScheduleAPI'
import { calendarModalState } from '@/state/modal.state'
import { EventClickArg, EventInput } from '@fullcalendar/core'
import { useDiaryAPI } from '@/hooks/useDiaryAPI'
import 'dayjs/locale/ko'
import dayjs from 'dayjs'
import { sideMenuState } from '@/state/menu.state'

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
  const { fetchScheduleById } = useScheduleAPI(calendarRef)
  const { fetchDiaryById } = useDiaryAPI(calendarRef)
  const setSelectedDate = useSetRecoilState<Date | undefined>(selectedDateState)
  const calendarEvent = useRecoilValue<EventInput[]>(calendarEventState)
  const setShowModal = useSetRecoilState<boolean>(calendarModalState)
  const [title, setTitle] = useRecoilState<string>(calendarTitleState)
  const selectedMenu = useRecoilValue<string>(selectedMenuState)
  const setSideMenu = useSetRecoilState(sideMenuState)

  const onDateSelect = (arg: DateClickArg) => {
    setShowModal(true)
    setSelectedDate(arg.date)
  }

  const onEventClick = async (clickInfo: EventClickArg) => {
    if (clickInfo.event.extendedProps.type === SIDE_MENU_TYPE.SCHEDULE) {
      const scheduleId = clickInfo.event.extendedProps._id
      if (scheduleId) {
        await fetchScheduleById(scheduleId)
      }
      setSideMenu(SIDE_MENU_TYPE.SCHEDULE)
    }
    if (clickInfo.event.extendedProps.type === SIDE_MENU_TYPE.DIARY) {
      const diaryId = clickInfo.event.extendedProps._id
      if (diaryId) {
        await fetchDiaryById(diaryId)
      }
      setSideMenu(SIDE_MENU_TYPE.DIARY)
    }
    setShowModal(true)
  }

  useEffect(() => {
    const calendarApi = calendarRef.current?.getApi()
    if (calendarApi && title === '') {
      setTitle(calendarApi?.view?.title ?? '')
    }
  }, [calendarRef.current])

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
        allDayText="종일"
        dayHeaderContent={(args) => {
          const week = dayjs(args.date).locale('ko').format('ddd')
          const day = dayjs(args.date).locale('ko').format('D')
          return {
            html: `<div>${week}</div><div>${day}</div>`,
          }
        }}
        slotLabelFormat={{
          hour: '2-digit',
          hour12: false,
        }}
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
      />
    </Container>
  )
}

export default CalendarView
