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
import { SCHEDULE } from '@/types/Calendar'
import { useSetRecoilState } from 'recoil'
import { EventInput } from '@fullcalendar/core'
import { calendarEventState, scheduleState } from '@/state/calendar.state'
import { calendarModalState } from '@/state/modal.state'

export function useCalendarAPI(calendarRef: React.RefObject<FullCalendar>) {
  const setShowModal = useSetRecoilState<boolean>(calendarModalState)
  const setSchedule = useSetRecoilState<SCHEDULE>(scheduleState)
  const setCalendarEvent = useSetRecoilState<EventInput[]>(calendarEventState)

  const fetchSchedule = async () => {
    const calendarApi = calendarRef.current?.getApi()
    if (calendarApi) {
      const date = dayjs(calendarApi.getDate()).format('YYYY-MM-DD')
      const schedule = await getSchedules<EventInput[]>(date)
      if (schedule && schedule.length > 0) {
        setCalendarEvent(schedule)
      }
    }
  }

  const fetchScheduleById = async (scheduleId: string) => {
    const updateSchedule = await getScheduleById<SCHEDULE>(scheduleId)
    setSchedule(updateSchedule)
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
      ) as EventInput[]
      if (schedule) {
        setCalendarEvent(calendarEvents)
      }
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

  const createDiaries = async (diaries: EventInput) => {
    await createDiaries(diaries)
    await fetchSchedule()
  }

  return {
    fetchSchedule,
    fetchScheduleById,
    fetchScheduleRange,
    createSchedule,
    updateSchedule,
    deleteSchedule,
    createDiaries,
  }
}
