import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import Modal from './index'
import FullCalendar from '@fullcalendar/react'
import Diary from '@/component/Modal/Diary'
import Schedule from '@/component/Modal/Schedule'
import dayjs from 'dayjs'
import Tab from '@mui/material/Tab'
import { LocalizationProvider, MobileDatePicker } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'
import { calendarModalState } from '@/state/modal.state'
import { DIARY, SCHEDULE } from '@/types/Calendar'
import { TabContext, TabList, TabPanel } from '@mui/lab'
import { sideMenuState } from '@/state/menu.state'
import {
  diaryState,
  scheduleState,
  selectedDateState,
} from '@/state/calendar.state'

const Container = styled.div`
  width: 100%;
  height: 100%;
  padding: 50px 20px 20px 20px;
  display: flex;
  flex-direction: column;
`

const RowContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-top: 20px;
`

const TimeLabel = styled.label`
  font-size: 18px;
`

interface Props {
  calendarRef: React.RefObject<FullCalendar>
}

const CalendarModal: React.FC<Props> = ({ calendarRef }) => {
  const selectedDate = useRecoilValue<Date | undefined>(selectedDateState)
  const [currentDate, setCurrentDate] = useState<Date>(
    selectedDate || new Date()
  )
  const showModal = useRecoilValue<boolean>(calendarModalState)
  const setShowModal = useSetRecoilState<boolean>(calendarModalState)
  const setSchedule = useSetRecoilState<SCHEDULE>(scheduleState)
  const setDiary = useSetRecoilState<DIARY>(diaryState)
  const [sideMenu, setSideMenu] = useRecoilState(sideMenuState)

  const initSchedule = {
    title: '',
    allDay: true,
    start: dayjs(selectedDate).add(1, 'hour'),
    end: dayjs(selectedDate).add(2, 'hour'),
  }

  const initDiary = {
    title: '',
    content: '',
  }

  useEffect(() => {
    setSchedule(initSchedule)
    setDiary(initDiary)
    setCurrentDate(selectedDate || new Date())
  }, [selectedDate])

  function onCloseModal() {
    setShowModal(false)
  }

  function onChangeMenu(event: React.SyntheticEvent, newValue: string) {
    setSideMenu(newValue)
  }

  function onChangeDate(date: dayjs.Dayjs | null) {
    if (date) {
      setCurrentDate(date.toDate())
    }
  }

  return (
    <Modal
      visible={showModal}
      close={onCloseModal}
      width={'100vw'}
      height={'100vh'}
    >
      <Container>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <TabContext value={sideMenu}>
            <TabList onChange={onChangeMenu}>
              <Tab label="일정" value="일정" />
              <Tab label="일기" value="일기" />
            </TabList>
            <TabPanel value="일정">
              <RowContainer>
                <TimeLabel>날짜</TimeLabel>
                <MobileDatePicker
                  format={'YY-MM-DD'}
                  onChange={onChangeDate}
                  value={dayjs(currentDate)}
                />
                <Schedule
                  calendarRef={calendarRef}
                  setShowModal={setShowModal}
                  currentDate={currentDate}
                />
              </RowContainer>
            </TabPanel>
            <TabPanel value="일기">
              <RowContainer>
                <TimeLabel>날짜</TimeLabel>
                <MobileDatePicker
                  format={'YY-MM-DD'}
                  onChange={onChangeDate}
                  value={dayjs(currentDate)}
                />
                <Diary
                  calendarRef={calendarRef}
                  setShowModal={setShowModal}
                  currentDate={currentDate}
                />
              </RowContainer>
            </TabPanel>
          </TabContext>
        </LocalizationProvider>
      </Container>
    </Modal>
  )
}

export default CalendarModal
