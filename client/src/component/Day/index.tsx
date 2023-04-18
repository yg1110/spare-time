import React from 'react'
import styled from 'styled-components'
import './day.css'

const hours = Array.from({ length: 24 }, (_, i: number) => i + 1)
const Container = styled.div`
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 10px;
  padding-bottom: 20px;
`

const Square = styled.div`
  background: #ecedf0;
`

const DayView = () => {
  return (
    <Container>
      {hours.map((hour) => (
        <Square key={hour}></Square>
      ))}
    </Container>
  )
}

export default DayView
