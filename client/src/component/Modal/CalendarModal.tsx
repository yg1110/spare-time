import React, { useState } from 'react'
import styled from 'styled-components'
import Modal from './index'
import FullCalendar from '@fullcalendar/react'
import Diary from '@/component/Modal/Diary'
import Schedule from '@/component/Modal/Schedule'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { CATEGORIES, CATEGORY, LANG } from '@/utils/constant'
import { MenuItem, Select, SelectChangeEvent } from '@mui/material'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import { calendarModalState } from '@/state/modal.state'
import { calendarTitleState } from '@/state/calendar.state'

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

interface Props {
  calendarRef: React.RefObject<FullCalendar>
}

const CalendarModal: React.FC<Props> = ({ calendarRef }) => {
  const [category, setCategory] = useState<string>(CATEGORY.SCHEDULE.name)
  const setShowModal = useSetRecoilState<boolean>(calendarModalState)
  const headerTitle = useRecoilValue<string>(calendarTitleState)
  const showModal = useRecoilValue<boolean>(calendarModalState)

  function onChangeCategory(event: SelectChangeEvent) {
    setCategory(event.target.value)
  }

  function onCloseModal() {
    setShowModal(false)
  }

  console.log(`calendarModal`)

  return (
    <Modal
      visible={showModal}
      close={onCloseModal}
      width={'100vw'}
      height={'100vh'}
    >
      <Container>
        <Title>{headerTitle}</Title>
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
            {category === CATEGORY.DIARY.name && (
              <Diary setShowModal={setShowModal} />
            )}
            {category === CATEGORY.SCHEDULE.name && (
              <Schedule calendarRef={calendarRef} setShowModal={setShowModal} />
            )}
          </RowContainer>
        </LocalizationProvider>
      </Container>
    </Modal>
  )
}

export default CalendarModal
