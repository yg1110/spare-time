import React from 'react'
import CalendarView from '../component/CalendarView'
import Nav from '../component/Nav'
import styled from 'styled-components'
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
  const { title, handlePrev, handleNext, calendarRef } = useCalendar()
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
