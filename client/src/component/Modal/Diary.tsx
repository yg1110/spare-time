import React from 'react'
import styled from 'styled-components'
import { TextareaAutosize } from '@mui/material'
import { DIARY } from '@/types/Calendar'
import { useRecoilState, useRecoilValue } from 'recoil'
import { diaryState, selectedDateState } from '@/state/calendar.state'
import { MODAL_MODE } from '@/utils/constant'
import { isValidValue } from '@/utils/helper'
import { useDiaryAPI } from '@/hooks/useDiaryAPI'
import FullCalendar from '@fullcalendar/react'

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

const Input = styled.input`
  width: 100%;
  height: 54px;
  font-size: 18px;
  padding: 16.5px 14px;
  border-radius: 5px;
  border: #ddd 1px solid;
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

interface Props {
  calendarRef: React.RefObject<FullCalendar>
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>
}

const Diary: React.FC<Props> = ({ calendarRef, setShowModal }) => {
  const { createDiary, updateDiary, deleteDiary } = useDiaryAPI(calendarRef)
  const [diary, setDiary] = useRecoilState<DIARY>(diaryState)
  const selectedDate = useRecoilValue<Date | undefined>(selectedDateState)
  const mode = diary?._id ? MODAL_MODE.MODIFY : MODAL_MODE.CREATE

  function onChangeValue(
    event:
      | React.ChangeEvent<HTMLTextAreaElement>
      | React.ChangeEvent<HTMLInputElement>
  ) {
    const { name, value } = event.target
    setDiary({
      ...diary,
      [name]: value,
    })
  }

  async function onUpdateDiary(): Promise<void> {
    const diaryId = diary._id
    const event = {
      title: diary.title,
      content: diary.content,
    }
    if (diaryId) {
      await updateDiary(diaryId, event)
    }
    setShowModal(false)
  }

  async function onDeleteDiary(): Promise<void> {
    const diaryId = diary._id
    if (diaryId) {
      await deleteDiary(diaryId)
    }
    setShowModal(false)
  }

  async function onSubmit(): Promise<void> {
    const isValidTitle = isValidValue(diary.title)
    const isValidContent = isValidValue(diary.content)
    if (!isValidTitle) {
      alert('제목을 입력해주세요')
      return
    }
    if (!isValidContent) {
      alert('내용을 입력해주세요')
      return
    }
    const body = {
      ...diary,
      date: selectedDate,
    }
    await createDiary(body)
    setShowModal(false)
    setDiary({
      title: '',
      content: '',
    })
  }

  return (
    <>
      <TimeWrapper>
        <TimeLabel>제목</TimeLabel>
        <Input
          name="title"
          placeholder="일기 제목"
          value={diary.title}
          onChange={onChangeValue}
        />
      </TimeWrapper>
      <TimeWrapper>
        <TimeLabel>내용</TimeLabel>
        <DiaryInput
          maxRows={8}
          name="content"
          placeholder="일기 내용"
          onChange={onChangeValue}
          value={diary.content}
        />
      </TimeWrapper>
      {mode === MODAL_MODE.MODIFY ? (
        <>
          <DeleteButton onClick={onDeleteDiary}>
            <SubmitButtonText>삭제</SubmitButtonText>
          </DeleteButton>
          <SubmitButton onClick={onUpdateDiary}>
            <SubmitButtonText>수정</SubmitButtonText>
          </SubmitButton>
        </>
      ) : (
        <SubmitButton onClick={onSubmit}>
          <SubmitButtonText>생성</SubmitButtonText>
        </SubmitButton>
      )}
    </>
  )
}

export default Diary
