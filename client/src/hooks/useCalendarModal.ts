import React, { useEffect } from 'react'
import dayjs, { Dayjs } from 'dayjs'
import FullCalendar from '@fullcalendar/react'
import { SelectChangeEvent } from '@mui/material'
import { CALENDAR_STATE } from '@/models/Calendar'
import { useRecoilState, useSetRecoilState } from 'recoil'
import { calendarModalState } from '@/state/modal.state'
import { isValidDate, isValidValue } from '@/utils/helper'
import { calendarState } from '@/state/calendar.state'
import { useCalendarAPI } from '@/hooks/useCalendarAPI'
import { CATEGORY, SCHEDULE_MODE } from '@/utils/constant'
import { createDiaries } from '@/services/schedules.service'

export function useCalendarModal(calendarRef: React.RefObject<FullCalendar>) {
  const { createSchedule, updateSchedule, deleteSchedule } =
    useCalendarAPI(calendarRef)
  const setShowModal = useSetRecoilState<boolean>(calendarModalState)
  const [calendar, setCalendar] = useRecoilState<CALENDAR_STATE>(calendarState)
  const { schedule, diaries, category } = calendar
  const title = dayjs(calendar.selectedDate).format('YYYY년 MM월 DD일')
  const mode = schedule?._id ? SCHEDULE_MODE.MODIFY : SCHEDULE_MODE.CREATE

  useEffect(() => {
    if (calendar.selectedDate) {
      setCalendar({
        ...calendar,
        title: '',
        schedule: {
          start: dayjs(calendar.selectedDate),
          end: dayjs(calendar.selectedDate).endOf('day'),
        },
        diaries: {
          content: '',
        },
      })
    }
  }, [calendar.selectedDate])

  async function onSubmitSchedule(): Promise<void> {
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
      title: calendar.title,
      start: dayjs(schedule.start).format('YYYY-MM-DD HH:mm:ss'),
      end: dayjs(schedule.end).format('YYYY-MM-DD HH:mm:ss'),
    }
    await createSchedule(event)
    setShowModal(false)
    setCalendar({
      ...calendar,
      title: '',
      schedule: {
        start: dayjs(calendar.selectedDate),
        end: dayjs(calendar.selectedDate).endOf('day'),
      },
    })
  }

  async function onUpdateSchedule(): Promise<void> {
    const scheduleId = schedule._id
    const event = {
      title: calendar.title,
      start: dayjs(schedule.start).format('YYYY-MM-DD HH:mm:ss'),
      end: dayjs(schedule.end).format('YYYY-MM-DD HH:mm:ss'),
    }
    if (scheduleId) {
      await updateSchedule(scheduleId, event)
      setShowModal(false)
    }
  }

  async function onDeleteSchedule(): Promise<void> {
    const scheduleId = schedule._id
    if (scheduleId) {
      await deleteSchedule(scheduleId)
      setShowModal(false)
    }
  }

  async function onSubmitDiaries(): Promise<void> {
    const isValidTitle = isValidValue(calendar.title)
    const isValidContent = isValidValue(diaries.content)
    if (!isValidTitle) {
      alert('제목을 입력해주세요')
      return
    }
    if (!isValidContent) {
      alert('내용을 입력해주세요')
      return
    }
    const event = {
      title: calendar.title,
      content: diaries.content,
    }
    await createDiaries(event)
    setShowModal(false)
    setCalendar({
      ...calendar,
      title: '',
      diaries: {
        content: '',
      },
    })
  }

  function onSubmit() {
    switch (category) {
      case CATEGORY.DIARY.name:
        return onSubmitDiaries()
      case CATEGORY.SCHEDULE.name:
        return onSubmitSchedule()
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
      [name]: value,
    })
  }

  function onChangeScheduleValue(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target
    setCalendar({
      ...calendar,
      schedule: {
        ...schedule,
        [name]: value,
      },
    })
  }

  function onChangeDiaries(event: React.ChangeEvent<HTMLTextAreaElement>) {
    const { name, value } = event.target
    setCalendar({
      ...calendar,
      diaries: {
        ...diaries,
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
    calendar,
    schedule,
    diaries,
    category,
    onCloseModal,
    onChangeTime,
    onChangeValue,
    onChangeCategory,
    onChangeDiaries,
    onChangeScheduleValue,
    onSubmit,
    onUpdateSchedule,
    onDeleteSchedule,
  }
}
