import React, { useEffect } from 'react'
import CalendarView from '../component/CalendarView'
import Nav from '../component/Nav'
import styled from 'styled-components'
import FullCalendar from '@fullcalendar/react'
import { ArrowBackIos, ArrowForwardIos } from '@mui/icons-material'
import { useRecoilState } from 'recoil'
import { calendarTitleState } from '../state/calendar.state'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
`
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
const Calendar: React.FC = () => {
  const calendarRef = React.useRef<FullCalendar>(null)
  const [title, setTitle] = useRecoilState<string>(calendarTitleState)

  useEffect(() => {
    if (calendarRef.current) {
      const calendarApi = calendarRef.current?.getApi()
      if (calendarApi) {
        setTitle(calendarApi?.view?.title ?? '')
      }
    }
  }, [calendarRef.current])

  const handlePrev = () => {
    const calendarApi = calendarRef.current?.getApi()
    if (calendarApi) {
      calendarApi.prev()
      setTitle(calendarApi?.view?.title ?? '')
    }
  }

  const handleNext = () => {
    const calendarApi = calendarRef.current?.getApi()
    if (calendarApi) {
      calendarApi.next()
      setTitle(calendarApi?.view?.title ?? '')
    }
  }

  return (
    <Container>
      <Header>
        <Title>{title}</Title>
        <ButtonWrapper>
          <ArrowBackIos onClick={handlePrev} />
          <ArrowForwardIos onClick={handleNext} />
        </ButtonWrapper>
      </Header>
      <CalendarView calendarRef={calendarRef} />
      <Nav calendarRef={calendarRef} />
    </Container>
  )
}

export default Calendar
