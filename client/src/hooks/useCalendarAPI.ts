import dayjs from 'dayjs'
import React from 'react'
import FullCalendar from '@fullcalendar/react'
import {
  createSchedules,
  deleteSchedules,
  getScheduleById,
  getSchedules,
  getSchedulesRange,
  updateSchedules,
} from '@/services/schedules.service'
import { CALENDAR_STATE, SCHEDULE } from '@/models/Calendar'
import { useRecoilState, useSetRecoilState } from 'recoil'
import { EventInput } from '@fullcalendar/core'
import { calendarState } from '@/state/calendar.state'
import { calendarModalState } from '@/state/modal.state'

export function useCalendarAPI(calendarRef: React.RefObject<FullCalendar>) {
  const setShowModal = useSetRecoilState<boolean>(calendarModalState)
  const [calendar, setCalendar] = useRecoilState<CALENDAR_STATE>(calendarState)

  const fetchSchedule = async () => {
    const calendarApi = calendarRef.current?.getApi()
    if (calendarApi) {
      const date = dayjs(calendarApi.getDate()).format('YYYY-MM-DD')
      const schedule = await getSchedules<EventInput[]>(date)
      if (schedule && schedule.length > 0) {
        setCalendar({
          ...calendar,
          calendarEvents: schedule,
        })
      }
    }
  }

  const fetchScheduleById = async (scheduleId: string) => {
    const schedule = await getScheduleById<SCHEDULE>(scheduleId)
    setCalendar({
      ...calendar,
      schedule,
    })
    setShowModal(true)
  }

  const fetchScheduleRange = async () => {
    const calendarApi = calendarRef.current?.getApi()
    if (calendarApi) {
      const { currentStart, currentEnd } = calendarApi.view
      const startDate = dayjs(currentStart).format('YYYY-MM-DD')
      const endDate = dayjs(currentEnd).format('YYYY-MM-DD')
      const schedule = await getSchedulesRange<EventInput[]>(startDate, endDate)
      const calendarEvents = schedule.reduce(
        (prev, curr) => prev.concat(curr.schedules),
        []
      )
      setCalendar({
        ...calendar,
        calendarEvents,
      })
    }
  }

  const createSchedule = async (schedule: EventInput) => {
    await createSchedules(schedule)
    await fetchSchedule()
  }

  const updateSchedule = async (scheduleId: string, schedule: EventInput) => {
    await updateSchedules(scheduleId, schedule)
    await fetchScheduleRange()
  }

  const deleteSchedule = async (scheduleId: string) => {
    await deleteSchedules(scheduleId)
    await fetchScheduleRange()
  }

  return {
    fetchSchedule,
    fetchScheduleById,
    fetchScheduleRange,
    createSchedule,
    updateSchedule,
    deleteSchedule,
  }
}
