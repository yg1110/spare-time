import React from 'react'
import styled from 'styled-components'
import dayjs from 'dayjs'
import Modal from './index'
import { LocalizationProvider, TimePicker } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LANG } from '../../utils/constant'
import { DATE } from '../../models/Calendar'
import { EventInput } from '@fullcalendar/core'
import { useCalendarModal } from '@/hooks/useCalendarModal'

const Container = styled.div`
  width: 100%;
  height: 100%;
  padding: 20px;
  display: flex;
  flex-direction: column;
`

const RowContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-top: 20px;
`

const Title = styled.h1`
  font-size: 30px;
  font-weight: bold;
`

const TimeWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 7px;
`

const TimeLabel = styled.label`
  font-size: 18px;
`

const SubmitButton = styled.div`
  height: 50px;
  background-color: #6a92fe;
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
`

const SubmitButtonText = styled.p`
  color: white;
  font-size: 15px;
  font-weight: 600;
`

const Input = styled.input`
  width: 260px;
  height: 54px;
  font-size: 18px;
  padding: 16.5px 14px;
  border-radius: 5px;
  border: #ddd 1px solid;
`

interface Props {
  selectedDate: DATE
  showModal: boolean
  submitEvent: (event: EventInput) => void
  closeEvent: () => void
}

const CalendarModal: React.FC<Props> = ({
  selectedDate,
  showModal,
  submitEvent,
  closeEvent,
}) => {
  const { time, onChangeValue, onChangeTime, handleSubmitSpareTime } =
    useCalendarModal({
      selectedDate: selectedDate,
      submitEvent: submitEvent,
    })
  return (
    <Modal visible={showModal} close={closeEvent} width={300}>
      <Container>
        <Title>{selectedDate.title}</Title>
        <LocalizationProvider dateAdapter={AdapterDayjs} locale={LANG}>
          <RowContainer>
            <TimeWrapper>
              <TimeLabel>제목</TimeLabel>
              <Input name="title" value={time.title} onChange={onChangeValue} />
            </TimeWrapper>
            <TimeWrapper>
              <TimeLabel>시작 시간</TimeLabel>
              <TimePicker
                defaultValue={dayjs().startOf('day')}
                value={time.startTime}
                onChange={(time) => onChangeTime('startTime', time)}
              />
            </TimeWrapper>
            <TimeWrapper>
              <TimeLabel>종료 시간</TimeLabel>
              <TimePicker
                defaultValue={dayjs().startOf('day')}
                value={time.endTime}
                onChange={(time) => onChangeTime('endTime', time)}
              />
            </TimeWrapper>
            <SubmitButton onClick={handleSubmitSpareTime}>
              <SubmitButtonText>저장</SubmitButtonText>
            </SubmitButton>
          </RowContainer>
        </LocalizationProvider>
      </Container>
    </Modal>
  )
}

export default CalendarModal
