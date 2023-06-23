import React, { useEffect } from 'react'
import styled from 'styled-components'
import Modal from './index'
import FullCalendar from '@fullcalendar/react'
import Diary from '@/component/Modal/Diary'
import Schedule from '@/component/Modal/Schedule'
import dayjs from 'dayjs'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LANG, SIDE_MENU_TYPE } from '@/utils/constant'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import { calendarModalState } from '@/state/modal.state'
import {
  diaryState,
  scheduleState,
  selectedDateState,
} from '@/state/calendar.state'
import { DIARY, SCHEDULE } from '@/types/Calendar'
import { sideMenuState } from '@/state/menu.state'

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

interface Props {
  calendarRef: React.RefObject<FullCalendar>
}

const CalendarModal: React.FC<Props> = ({ calendarRef }) => {
  const selectedDate = useRecoilValue<Date | undefined>(selectedDateState)
  const showModal = useRecoilValue<boolean>(calendarModalState)
  const sideMenu = useRecoilValue(sideMenuState)
  const setShowModal = useSetRecoilState<boolean>(calendarModalState)
  const setSchedule = useSetRecoilState<SCHEDULE>(scheduleState)
  const setDiary = useSetRecoilState<DIARY>(diaryState)

  const initSchedule = {
    title: '',
    start: dayjs(selectedDate).startOf('day'),
    end: dayjs(selectedDate).endOf('day'),
  }

  const initDiary = {
    title: '',
    content: '',
  }

  useEffect(() => {
    setSchedule(initSchedule)
    setDiary(initDiary)
  }, [selectedDate])

  function onCloseModal() {
    setShowModal(false)
  }

  return (
    <Modal
      visible={showModal}
      close={onCloseModal}
      width={'100vw'}
      height={'100vh'}
    >
      <Container>
        <Title>{dayjs(selectedDate).format('YYYY-MM-DD')}</Title>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <RowContainer>
            {sideMenu === SIDE_MENU_TYPE.DIARY && (
              <Diary calendarRef={calendarRef} setShowModal={setShowModal} />
            )}
            {sideMenu === SIDE_MENU_TYPE.SCHEDULE && (
              <Schedule calendarRef={calendarRef} setShowModal={setShowModal} />
            )}
          </RowContainer>
        </LocalizationProvider>
      </Container>
    </Modal>
  )
}

export default CalendarModal
