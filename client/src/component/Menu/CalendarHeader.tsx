import React, { useEffect } from 'react'
import styled from 'styled-components'
import FullCalendar from '@fullcalendar/react'
import { ArrowBackIos, ArrowForwardIos } from '@mui/icons-material'
import { useRecoilState } from 'recoil'
import { calendarTitleState } from '@/state/calendar.state'
import { useDateAPI } from '@/hooks/useDateAPI'

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  height: 56px;
  width: 100%;
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
  const { fetchDateRange } = useDateAPI(calendarRef)
  const [title, setTitle] = useRecoilState<string>(calendarTitleState)

  useEffect(() => {
    fetchDateRange()
  }, [title])

  const onPrev = async () => {
    const calendarApi = calendarRef.current?.getApi()
    if (calendarApi) {
      calendarApi.prev()
      await fetchDateRange()
      setTitle(calendarApi?.view?.title ?? '')
    }
  }

  const onNext = async () => {
    const calendarApi = calendarRef.current?.getApi()
    if (calendarApi) {
      calendarApi.next()
      await fetchDateRange()
      setTitle(calendarApi?.view?.title ?? '')
    }
  }

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
