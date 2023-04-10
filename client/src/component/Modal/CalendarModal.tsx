import React, { useEffect } from 'react'
import styled from 'styled-components'
import Modal from '../Modal'
import dayjs, { Dayjs } from 'dayjs'
import { LocalizationProvider, TimeClock } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LANG } from '../../common/utils/Constant'
import { CALENDAR_DATE } from '../../common/type/Calendar'

const Container = styled.div`
  width: 100%;
  padding: 20px;
  display: flex;
  flex-direction: column;
`

const ColumnContainer = styled.div`
  display: flex;
`

const Title = styled.h1`
  font-size: 30px;
  font-weight: bold;
  text-align: center;
`

interface Props {
  selectedDate: CALENDAR_DATE
  showModal: boolean
  closeEvent: () => void
}

const CalendarModal: React.FC<Props> = ({
  selectedDate,
  showModal,
  closeEvent,
}) => {
  const [value, setValue] = React.useState<Dayjs | null>()

  useEffect(() => {
    if (selectedDate) {
      setValue(dayjs(selectedDate.date))
    }
  }, [selectedDate])

  return (
    <Modal visible={showModal} close={closeEvent}>
      <Container>
        <Title>{selectedDate.title}</Title>
        <LocalizationProvider dateAdapter={AdapterDayjs} locale={LANG}>
          <ColumnContainer>
            <TimeClock
              value={value}
              onChange={(newValue) => setValue(newValue)}
            />
            <TimeClock
              value={value}
              onChange={(newValue) => setValue(newValue)}
            />
          </ColumnContainer>
        </LocalizationProvider>
      </Container>
    </Modal>
  )
}

export default CalendarModal
