import React, { useEffect } from 'react'
import dayjs, { Dayjs } from 'dayjs'
import FullCalendar from '@fullcalendar/react'
import { CATEGORY } from '@/utils/constant'
import { SelectChangeEvent } from '@mui/material'
import { CALENDAR_STATE, SCHEDULE } from '@/models/Calendar'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import { calendarModalState } from '@/state/modal.state'
import { isValidDate } from '@/utils/helper'
import { calendarState } from '@/state/calendar.state'
import { useCalendarAPI } from '@/hooks/useCalendarAPI'

const INIT_SCHEDULE = {
  title: '',
  start: dayjs().startOf('day'),
  end: dayjs().endOf('day'),
}

export function useCalendarModal(calendarRef: React.RefObject<FullCalendar>) {
  const { createSchedule } = useCalendarAPI(calendarRef)
  const [category, setCategory] = React.useState<string>(CATEGORY.SCHEDULE.name)
  const [schedule, setSchedule] = React.useState<SCHEDULE>({ ...INIT_SCHEDULE })
  const setShowModal = useSetRecoilState<boolean>(calendarModalState)
  const calendar = useRecoilValue<CALENDAR_STATE>(calendarState)
  const title = dayjs(calendar.selectedDate).format('YYYY년 MM월 DD일')

  useEffect(() => {
    if (calendar.selectedDate) {
      setSchedule({
        ...schedule,
        start: dayjs(calendar.selectedDate),
        end: dayjs(calendar.selectedDate).endOf('day'),
      })
    }
  }, [calendar])

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
    setSchedule({
      title: '',
      start: dayjs().startOf('day'),
      end: dayjs().endOf('day'),
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

  function onChangeValue(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target
    setSchedule({
      ...schedule,
      [name]: value,
    })
  }

  function onChangeCategory(event: SelectChangeEvent) {
    setCategory(event.target.value)
  }

  function onCloseModal() {
    setShowModal(false)
  }

  return {
    title,
    schedule,
    category,
    onCloseModal,
    onChangeValue,
    onChangeTime,
    onChangeCategory,
    handleSubmitSpareTime,
  }
}
