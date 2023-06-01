import React from 'react'
import styled from 'styled-components'
import CalendarView from '@/component/CalendarView'
import Nav from '@/component/Nav'
import FullCalendar from '@fullcalendar/react'
import CalendarModal from '@/component/Modal/CalendarModal'
import { ArrowBackIos, ArrowForwardIos } from '@mui/icons-material'
import { useCalendar } from '@/hooks/useCalendar'

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
  const { calendar, onPrev, onNext } = useCalendar(calendarRef)

  return (
    <Container>
      <Header>
        <Title>{calendar.title}</Title>
        <ButtonWrapper>
          <ArrowBackIos onClick={onPrev} />
          <ArrowForwardIos onClick={onNext} />
        </ButtonWrapper>
      </Header>
      <CalendarView calendarRef={calendarRef} />
      <CalendarModal calendarRef={calendarRef} />
      <Nav calendarRef={calendarRef} />
    </Container>
  )
}

export default Calendar
