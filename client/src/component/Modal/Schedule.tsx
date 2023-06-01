import React from 'react'
import styled from 'styled-components'
import dayjs from 'dayjs'
import FullCalendar from '@fullcalendar/react'
import { TimePicker } from '@mui/x-date-pickers'
import { useCalendarModal } from '@/hooks/useCalendarModal'

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

const Schedule: React.FC<Props> = ({ calendarRef }) => {
  const { schedule, onChangeTime } = useCalendarModal(calendarRef)
  return (
    <>
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
    </>
  )
}

export default Schedule
