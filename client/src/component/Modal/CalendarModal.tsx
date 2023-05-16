import React from 'react'
import styled from 'styled-components'
import dayjs from 'dayjs'
import Modal from './index'
import FullCalendar from '@fullcalendar/react'
import { LocalizationProvider, TimePicker } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { useCalendarModal } from '@/hooks/useCalendarModal'
import { CATEGORIES, LANG, SCHEDULE_MODE } from '@/utils/constant'
import { MenuItem, Select } from '@mui/material'
import { useRecoilValue } from 'recoil'
import { calendarModalState } from '@/state/modal.state'

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
  max-width: 80%;
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

const DeleteButton = styled.div`
  height: 50px;
  background-color: #ff6767;
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
  width: 100%;
  height: 54px;
  font-size: 18px;
  padding: 16.5px 14px;
  border-radius: 5px;
  border: #ddd 1px solid;
`

interface Props {
  calendarRef: React.RefObject<FullCalendar>
}

const CalendarModal: React.FC<Props> = ({ calendarRef }) => {
  const showModal = useRecoilValue<boolean>(calendarModalState)
  const {
    title,
    mode,
    schedule,
    category,
    onCloseModal,
    onChangeValue,
    onChangeTime,
    onChangeCategory,
    handleSubmitSpareTime,
    handleDeleteSpareTime,
    handleUpdateSpareTime,
  } = useCalendarModal(calendarRef)
  return (
    <Modal
      visible={showModal}
      close={onCloseModal}
      width={'100vw'}
      height={'100vh'}
    >
      <Container>
        <Title>{title}</Title>
        <LocalizationProvider dateAdapter={AdapterDayjs} locale={LANG}>
          <RowContainer>
            <TimeWrapper>
              <TimeLabel>카테고리</TimeLabel>
              <Select
                id="category-select"
                value={category}
                onChange={onChangeCategory}
              >
                {CATEGORIES.map((item) => (
                  <MenuItem key={item.key} value={item.name}>
                    {item.name}
                  </MenuItem>
                ))}
              </Select>
            </TimeWrapper>
            <TimeWrapper>
              <TimeLabel>제목</TimeLabel>
              <Input
                name="title"
                value={schedule.title}
                onChange={onChangeValue}
              />
            </TimeWrapper>
            <TimeWrapper>
              <TimeLabel>시작 시간</TimeLabel>
              <TimePicker
                defaultValue={dayjs().startOf('day')}
                value={dayjs(schedule.start)}
                onChange={(time) => onChangeTime('start', time)}
              />
            </TimeWrapper>
            <TimeWrapper>
              <TimeLabel>종료 시간</TimeLabel>
              <TimePicker
                defaultValue={dayjs().startOf('day')}
                value={dayjs(schedule.end)}
                onChange={(time) => onChangeTime('end', time)}
              />
            </TimeWrapper>
            {mode === SCHEDULE_MODE.MODIFY ? (
              <>
                <DeleteButton onClick={handleDeleteSpareTime}>
                  <SubmitButtonText>삭제</SubmitButtonText>
                </DeleteButton>
                <SubmitButton onClick={handleUpdateSpareTime}>
                  <SubmitButtonText>수정</SubmitButtonText>
                </SubmitButton>
              </>
            ) : (
              <SubmitButton onClick={handleSubmitSpareTime}>
                <SubmitButtonText>생성</SubmitButtonText>
              </SubmitButton>
            )}
          </RowContainer>
        </LocalizationProvider>
      </Container>
    </Modal>
  )
}

export default CalendarModal
