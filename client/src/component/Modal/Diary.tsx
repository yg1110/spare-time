import React from 'react'
import styled from 'styled-components'
import { TextareaAutosize } from '@mui/material'
import FullCalendar from '@fullcalendar/react'
import { useCalendarModal } from '@/hooks/useCalendarModal'

const TimeWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 7px;
`

const TimeLabel = styled.label`
  font-size: 18px;
`

const DiaryInput = styled(TextareaAutosize)`
  width: 100%;
  height: 250px !important;
  font-family: IBM Plex Sans, sans-serif;
  font-size: 18px;
  font-weight: 400;
  line-height: 1.5;
  padding: 12px;
  border-radius: 5px;
  color: #24292f;
  background: #fff;
  border: 1px solid #d0d7de;
  box-shadow: 0px 2px 2px #f6f8fa;

  &:hover {
    border-color: #3399ff;
  }

  &:focus {
    border-color: #3399ff;
    box-shadow: 0 0 0 3px #b6daff;
  }

  // firefox
  &:focus-visible {
    outline: 0;
  }
`

interface Props {
  calendarRef: React.RefObject<FullCalendar>
}

const Diary: React.FC<Props> = ({ calendarRef }) => {
  const { diaries, onChangeDiaries } = useCalendarModal(calendarRef)

  return (
    <TimeWrapper>
      <TimeLabel>내용</TimeLabel>
      <DiaryInput
        maxRows={8}
        name="content"
        placeholder="일기 내용"
        onChange={onChangeDiaries}
        value={diaries.content}
      />
    </TimeWrapper>
  )
}

export default Diary
