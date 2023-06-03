import React, { useEffect } from 'react'
import styled from 'styled-components'
import FullCalendar from '@fullcalendar/react'
import { ArrowBackIos, ArrowForwardIos } from '@mui/icons-material'
import { useRecoilState } from 'recoil'
import { calendarTitleState } from '@/state/calendar.state'
import { useCalendarAPI } from '@/hooks/useCalendarAPI'

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  padding: 0 1rem;
  height: 56px;
  align-items: center;
  text-align: center;
`

const ButtonWrapper = styled.div``
const Title = styled.h1`
  font-size: 1rem;
`

interface Props {
  calendarRef: React.RefObject<FullCalendar>
}

const CalendarHeader: React.FC<Props> = ({ calendarRef }) => {
  const { fetchScheduleRange } = useCalendarAPI(calendarRef)
  const [title, setTitle] = useRecoilState<string>(calendarTitleState)

  useEffect(() => {
    fetchScheduleRange()
  }, [title])

  const onPrev = async () => {
    const calendarApi = calendarRef.current?.getApi()
    if (calendarApi) {
      calendarApi.prev()
      // await fetchScheduleRange()
      setTitle(calendarApi?.view?.title ?? '')
    }
  }

  const onNext = async () => {
    const calendarApi = calendarRef.current?.getApi()
    if (calendarApi) {
      calendarApi.next()
      // await fetchScheduleRange()
      setTitle(calendarApi?.view?.title ?? '')
    }
  }

  console.log(`header`)

  return (
    <Header>
      <Title>{title}</Title>
      <ButtonWrapper>
        <ArrowBackIos onClick={onPrev} />
        <ArrowForwardIos onClick={onNext} />
      </ButtonWrapper>
    </Header>
  )
}

export default CalendarHeader
