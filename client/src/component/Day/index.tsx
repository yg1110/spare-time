import React from 'react'
import styled from 'styled-components'
import './day.css'

const hours = Array.from({ length: 24 }, (_, i: number) => i + 1)
const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 10px;
  margin: 10px;
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
