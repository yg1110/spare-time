import React from 'react'
import styled from 'styled-components'
import FullCalendar from '@fullcalendar/react'
import dayjs, { Dayjs } from 'dayjs'
import { TimePicker } from '@mui/x-date-pickers'
import { MODAL_MODE } from '@/utils/constant'
import { isValidDate } from '@/utils/helper'
import { useRecoilState, useSetRecoilState } from 'recoil'
import { SCHEDULE } from '@/types/Calendar'
import { scheduleState, selectedDateState } from '@/state/calendar.state'
import { useScheduleAPI } from '@/hooks/useScheduleAPI'
import { useSession } from 'next-auth/react'

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
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>
  currentDate: Date
}

const Schedule: React.FC<Props> = ({
  calendarRef,
  setShowModal,
  currentDate,
}) => {
  const { data: session } = useSession()
  const { createSchedule, updateSchedule, deleteSchedule } =
    useScheduleAPI(calendarRef)
  const [schedule, setSchedule] = useRecoilState<SCHEDULE>(scheduleState)
  const setSelectedDate = useSetRecoilState<Date | undefined>(selectedDateState)
  const mode = schedule?._id ? MODAL_MODE.MODIFY : MODAL_MODE.CREATE

  function onChangeValue(
    event:
      | React.ChangeEvent<HTMLTextAreaElement>
      | React.ChangeEvent<HTMLInputElement>
  ) {
    const { name, value } = event.target
    setSchedule({
      ...schedule,
      [name]: value,
    })
  }

  function onChangeTime(name: string, selectTime: Dayjs | null) {
    if (selectTime) {
      setSchedule({
        ...schedule,
        [name]: selectTime,
      })
    }
  }

  async function onUpdateSchedule(): Promise<void> {
    const scheduleId = schedule._id
    const date = dayjs(currentDate).format('YYYY-MM-DD')
    const start = dayjs(schedule.start).format('HH:mm:ss')
    const end = dayjs(schedule.end).format('HH:mm:ss')
    const event = {
      title: schedule.title,
      start: dayjs(`${date} ${start}`).format('YYYY-MM-DD HH:mm:ss'),
      end: dayjs(`${date} ${end}`).format('YYYY-MM-DD HH:mm:ss'),
    }
    if (scheduleId) {
      setSelectedDate(currentDate)
      await updateSchedule(scheduleId, event)
    }
    setShowModal(false)
  }

  async function onDeleteSchedule(): Promise<void> {
    const scheduleId = schedule._id
    if (scheduleId) {
      setSelectedDate(new Date())
      await deleteSchedule(scheduleId)
      setShowModal(false)
    }
  }

  async function onSubmit() {
    const isValidStartDate = isValidDate(schedule.start)
    const isValidEndDate = isValidDate(schedule.end)
    if (!isValidStartDate) {
      alert('시작 시간을 선택해주세요.')
      return
    }
    if (!isValidEndDate) {
      alert('종료 시간을 선택해주세요.')
      return
    }

    const date = dayjs(currentDate).format('YYYY-MM-DD')
    const start = dayjs(schedule.start).format('HH:mm:ss')
    const end = dayjs(schedule.end).format('HH:mm:ss')
    const event = {
      date: dayjs(currentDate).format('YYYY-MM-DD'),
      userId: session?.user?.email ?? '',
      title: schedule.title,
      start: dayjs(`${date} ${start}`).format('YYYY-MM-DD HH:mm:ss'),
      end: dayjs(`${date} ${end}`).format('YYYY-MM-DD HH:mm:ss'),
    }
    setSelectedDate(currentDate)
    await createSchedule(event)
    setShowModal(false)
  }

  return (
    <>
      <TimeWrapper>
        <TimeLabel>제목</TimeLabel>
        <Input
          name="title"
          placeholder="일정 제목"
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

      {mode === MODAL_MODE.MODIFY ? (
        <>
          <DeleteButton onClick={onDeleteSchedule}>
            <SubmitButtonText>삭제</SubmitButtonText>
          </DeleteButton>
          <SubmitButton onClick={onUpdateSchedule}>
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

export default Schedule
