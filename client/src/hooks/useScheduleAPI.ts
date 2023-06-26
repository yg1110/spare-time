import dayjs from 'dayjs'
import React from 'react'
import FullCalendar from '@fullcalendar/react'
import { DATES, SCHEDULE } from '@/types/Calendar'
import { useSetRecoilState } from 'recoil'
import { EventInput } from '@fullcalendar/core'
import { calendarEventState, scheduleState } from '@/state/calendar.state'
import { useLazyQuery, useMutation } from '@apollo/client'
import {
  DELETE_SCHEDULE,
  EDIT_SCHEDULE,
  INSERT_SCHEDULE,
} from '@/graphql/_mutaions'
import { GET_SCHEDULE_ID, GET_SCHEDULES_RANGE } from '@/graphql/_queries'

export function useScheduleAPI(calendarRef: React.RefObject<FullCalendar>) {
  const setSchedule = useSetRecoilState<SCHEDULE>(scheduleState)
  const setCalendarEvent = useSetRecoilState<EventInput[]>(calendarEventState)
  const [getSchedulesRange] = useLazyQuery(GET_SCHEDULES_RANGE, {
    fetchPolicy: 'network-only',
  })
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
    const { findCalendarById } = data
    setSchedule(findCalendarById.schedules)
  }

  const fetchScheduleRange = async () => {
    const calendarApi = calendarRef.current?.getApi()
    if (calendarApi) {
      const { currentStart, currentEnd } = calendarApi.view
      const startDate = dayjs(currentStart).format('YYYY-MM-DD')
      const endDate = dayjs(currentEnd).format('YYYY-MM-DD')
      const { data } = await getSchedulesRange({
        variables: {
          start: startDate,
          end: endDate,
        },
      })
      const { findCalendarByRange } = data
      const calendarEvents = findCalendarByRange.reduce(
        (events: EventInput[], date: DATES) => events.concat(date.schedules),
        []
      ) as EventInput[]
      if (calendarEvents) {
        setCalendarEvent(calendarEvents)
      }
    }
  }

  const createSchedule = async (schedule: EventInput) => {
    await insertSchedule({
      variables: {
        ...schedule,
      },
    })
    await fetchScheduleRange()
  }

  const updateSchedule = async (scheduleId: string, schedule: EventInput) => {
    await editSchedule({
      variables: {
        scheduleId: scheduleId,
        ...schedule,
      },
    })
    await fetchScheduleRange()
  }

  const deleteSchedule = async (scheduleId: string) => {
    await removeSchedule({
      variables: {
        scheduleId: scheduleId,
      },
    })
    await fetchScheduleRange()
  }

  return {
    fetchScheduleById,
    fetchScheduleRange,
    createSchedule,
    updateSchedule,
    deleteSchedule,
  }
}
