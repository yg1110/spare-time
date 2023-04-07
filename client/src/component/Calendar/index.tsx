import React, { useState } from 'react'
import { DateRangePicker } from 'react-date-range'
import styled from 'styled-components'
import ko from 'date-fns/locale/ko'
import './calendar.css'

const Container = styled.div`
  display: flex;
  height: 100vh;
  width: 100vw;

  & > div {
    width: 100%;
  }
`

function Index() {
  const [range, setRange] = useState<any>([
    {
      startDate: new Date(),
      endDate: null,
      key: 'selection',
    },
  ])
  return (
    <Container>
      <DateRangePicker
        locale={ko}
        editableDateInputs={true}
        onChange={(item) => setRange([item.selection])}
        moveRangeOnFirstSelection={false}
        ranges={range}
      />
    </Container>
  )
}

export default Index
