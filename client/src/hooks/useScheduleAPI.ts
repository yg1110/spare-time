import React from 'react'
import FullCalendar from '@fullcalendar/react'
import { SCHEDULE } from '@/types/Calendar'
import { useSetRecoilState } from 'recoil'
import { EventInput } from '@fullcalendar/core'
import { scheduleState } from '@/state/calendar.state'
import { useLazyQuery, useMutation } from '@apollo/client'
import {
  DELETE_SCHEDULE,
  EDIT_SCHEDULE,
  INSERT_SCHEDULE,
} from '@/graphql/_mutaions'
import { GET_SCHEDULE_ID } from '@/graphql/_queries'
import { useDateAPI } from '@/hooks/useDateAPI'

export function useScheduleAPI(calendarRef: React.RefObject<FullCalendar>) {
  const setSchedule = useSetRecoilState<SCHEDULE>(scheduleState)
  const { fetchDateRange } = useDateAPI(calendarRef)
  const [getSchedulesId] = useLazyQuery(GET_SCHEDULE_ID)
  const [insertSchedule] = useMutation(INSERT_SCHEDULE)
  const [editSchedule] = useMutation(EDIT_SCHEDULE)
  const [removeSchedule] = useMutation(DELETE_SCHEDULE)

  const fetchScheduleById = async (scheduleId: string) => {
    const { data } = await getSchedulesId({
      variables: {
        scheduleId: scheduleId,
      },
    })
    if (!data) return
    const { findCalendarById } = data
    setSchedule(findCalendarById.schedules)
  }

  const createSchedule = async (schedule: EventInput) => {
    await insertSchedule({
      variables: {
        ...schedule,
      },
    })
    await fetchDateRange()
  }

  const updateSchedule = async (scheduleId: string, schedule: EventInput) => {
    await editSchedule({
      variables: {
        scheduleId: scheduleId,
        ...schedule,
      },
    })
    await fetchDateRange()
  }

  const deleteSchedule = async (scheduleId: string) => {
    await removeSchedule({
      variables: {
        scheduleId: scheduleId,
      },
    })
    await fetchDateRange()
  }

  return {
    fetchScheduleById,
    createSchedule,
    updateSchedule,
    deleteSchedule,
  }
}
