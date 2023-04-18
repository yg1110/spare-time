import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import './day.css'
import { useRecoilState } from 'recoil'
import { DATE } from '../../models/Calendar'
import { selectedDateState } from '../../state/calendar.state'
import { getHours } from '../../services/time.service'
import dayjs from 'dayjs'

const Container = styled.div`
  width: 100%;
  height: calc(100% - 120px);
`
const SquareWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 10px;
`

const RootSquare = styled.div`
  height: 100%;
  position: relative;
`

const BasicSquare = styled.div`
  position: absolute;
  height: 100%;
  width: 100%;
`

const Square = styled.div<{ width: number }>`
  position: absolute;
  height: 100%;
  width: ${(props) => (props.width ? `${props.width}%` : '100%')};
`

const TitleWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1.5rem;
`

const Title = styled.h1`
  font-size: 1.3rem;
`

const DayView = () => {
  const [selectedDate, setSelectedDate] =
    useRecoilState<DATE>(selectedDateState)
  const [hours, setHours] = useState<number[]>([])

  useEffect(() => {
    fetchDate()
  }, [])

  async function fetchDate() {
    const date = dayjs(selectedDate.date).format('YYYY-MM-DD')
    const data = await getHours<number[]>(date)
    console.log(`data`, data)
    setHours(data)
  }

  function scaleColor(hour: number) {
    if (hour >= 5) {
      return 'color-scale-5'
    } else if (hour >= 4) {
      return 'color-scale-4'
    } else if (hour >= 3) {
      return 'color-scale-3'
    } else if (hour >= 2) {
      return 'color-scale-2'
    } else if (hour >= 1) {
      return 'color-scale-1'
    } else if (hour > 0) {
      return 'color-scale-0'
    } else {
      return 'color-scale-none'
    }
  }

  function scaleBasicColor(hour: number) {
    const integerHour = Math.floor(hour)
    if (integerHour >= 5) {
      return 'color-scale-4'
    } else if (hour >= 4) {
      return 'color-scale-3'
    } else if (hour >= 3) {
      return 'color-scale-2'
    } else if (hour >= 2) {
      return 'color-scale-1'
    } else if (hour >= 1) {
      return 'color-scale-0'
    } else {
      return 'color-scale-none'
    }
  }

  return (
    <Container>
      <TitleWrapper>
        <Title>{selectedDate.title}</Title>
      </TitleWrapper>
      <SquareWrapper>
        {hours.map((hour, index) => (
          <RootSquare key={index}>
            <BasicSquare className={scaleBasicColor(hour)}></BasicSquare>
            <Square className={scaleColor(hour)} width={(hour % 1) * 100}>
              {hour}
            </Square>
          </RootSquare>
        ))}
      </SquareWrapper>
    </Container>
  )
}

export default DayView
