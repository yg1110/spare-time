import React, { useEffect } from 'react'
import styled from 'styled-components'
import dayjs, { Dayjs } from 'dayjs'
import { LocalizationProvider, TimePicker } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import Modal from './index'
import { LANG } from '../../utils/Constant'
import { isValidDate } from '../../utils/helper'
import { DATE, TIME } from '../../models/Calendar'
import { postTime } from '../../services/time.service'

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
  closeEvent: () => void
}

const CalendarModal: React.FC<Props> = ({
  selectedDate,
  showModal,
  closeEvent,
}) => {
  const [time, setTime] = React.useState<TIME>({
    startTime: dayjs().startOf('day'),
    endTime: dayjs(),
    category: '',
  })

  useEffect(() => {
    if (selectedDate) {
      const nowTime = dayjs(time.endTime).format('hh:mm:ss')
      const startDate = dayjs(selectedDate.date).format('YYYY-MM-DD')
      const endDate = dayjs(selectedDate.date).format('YYYY-MM-DD')
      setTime({
        ...time,
        startTime: dayjs(startDate + nowTime).startOf('day'),
        endTime: dayjs(endDate + nowTime),
      })
    }
  }, [selectedDate])

  async function handleSubmitSpareTime(): Promise<void> {
    const isValidStartDate = isValidDate(time.startTime)
    const isValidEndDate = isValidDate(time.endTime)
    if (!isValidStartDate) {
      alert('시작 시간을 선택해주세요.')
      return
    }
    if (!isValidEndDate) {
      alert('종료 시간을 선택해주세요.')
      return
    }
    const submitTime = {
      category: time.category,
      startTime: dayjs(time.startTime).format('YYYY-MM-DD hh:mm:ss'),
      endTIme: dayjs(time.endTime).format('YYYY-MM-DD hh:mm:ss'),
    } as unknown as TIME
    const res = await postTime(submitTime)
    if (res) {
      closeEvent()
      alert('Time Registration Success')
    } else {
      alert(res)
    }
  }

  function onChangeTime(name: string, selectTime: Dayjs | null) {
    if (selectTime) {
      setTime({
        ...time,
        [name]: dayjs(selectTime),
      })
    }
  }

  function onChangeValue(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target
    setTime({
      ...time,
      [name]: value,
    })
  }

  return (
    <Modal visible={showModal} close={closeEvent} width={300}>
      <Container>
        <Title>{selectedDate.title}</Title>
        <LocalizationProvider dateAdapter={AdapterDayjs} locale={LANG}>
          <RowContainer>
            <TimeWrapper>
              <TimeLabel>카테고리</TimeLabel>
              <Input
                name="category"
                value={time.category}
                onChange={onChangeValue}
              />
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
