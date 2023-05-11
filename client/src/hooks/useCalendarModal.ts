import React, { useEffect } from 'react'
import dayjs, { Dayjs } from 'dayjs'
import FullCalendar from '@fullcalendar/react'
import { SelectChangeEvent } from '@mui/material'
import { CALENDAR_STATE } from '@/models/Calendar'
import { useRecoilState, useSetRecoilState } from 'recoil'
import { calendarModalState } from '@/state/modal.state'
import { isValidDate } from '@/utils/helper'
import { calendarState } from '@/state/calendar.state'
import { useCalendarAPI } from '@/hooks/useCalendarAPI'
import { SCHEDULE_MODE } from '@/utils/constant'

export function useCalendarModal(calendarRef: React.RefObject<FullCalendar>) {
  const { createSchedule, updateSchedule, deleteSchedule } =
    useCalendarAPI(calendarRef)
  const setShowModal = useSetRecoilState<boolean>(calendarModalState)
  const [calendar, setCalendar] = useRecoilState<CALENDAR_STATE>(calendarState)
  const { schedule, category } = calendar
  const title = dayjs(calendar.selectedDate).format('YYYY년 MM월 DD일')
  const mode = schedule?._id ? SCHEDULE_MODE.MODIFY : SCHEDULE_MODE.CREATE

  useEffect(() => {
    if (calendar.selectedDate) {
      setCalendar({
        ...calendar,
        schedule: {
          title: '',
          start: dayjs(calendar.selectedDate),
          end: dayjs(calendar.selectedDate).endOf('day'),
        },
      })
    }
  }, [calendar.selectedDate])

  async function handleSubmitSpareTime(): Promise<void> {
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
    const event = {
      title: schedule.title,
      start: dayjs(schedule.start).format('YYYY-MM-DD HH:mm:ss'),
      end: dayjs(schedule.end).format('YYYY-MM-DD HH:mm:ss'),
    }
    await createSchedule(event)
    setShowModal(false)
    setCalendar({
      ...calendar,
      schedule: {
        title: '',
        start: dayjs(calendar.selectedDate),
        end: dayjs(calendar.selectedDate).endOf('day'),
      },
    })
  }

  async function handleUpdateSpareTime(): Promise<void> {
    const scheduleId = schedule._id
    const event = {
      title: schedule.title,
      start: dayjs(schedule.start).format('YYYY-MM-DD HH:mm:ss'),
      end: dayjs(schedule.end).format('YYYY-MM-DD HH:mm:ss'),
    }
    if (scheduleId) {
      await updateSchedule(scheduleId, event)
      setShowModal(false)
    }
  }

  async function handleDeleteSpareTime(): Promise<void> {
    const scheduleId = schedule._id
    if (scheduleId) {
      await deleteSchedule(scheduleId)
      setShowModal(false)
    }
  }

  function onChangeTime(name: string, selectTime: Dayjs | null) {
    if (selectTime) {
      setCalendar({
        ...calendar,
        schedule: {
          ...schedule,
          [name]: selectTime,
        },
      })
    }
  }

  function onChangeValue(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target
    setCalendar({
      ...calendar,
      schedule: {
        ...schedule,
        [name]: value,
      },
    })
  }

  function onChangeCategory(event: SelectChangeEvent) {
    setCalendar({
      ...calendar,
      category: event.target.value,
    })
  }

  function onCloseModal() {
    setShowModal(false)
  }

  return {
    title,
    mode,
    schedule,
    category,
    onCloseModal,
    onChangeValue,
    onChangeTime,
    onChangeCategory,
    handleSubmitSpareTime,
    handleUpdateSpareTime,
    handleDeleteSpareTime,
  }
}
