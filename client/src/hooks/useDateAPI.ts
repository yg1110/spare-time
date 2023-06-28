import React from 'react'
import FullCalendar from '@fullcalendar/react'
import { DATES } from '@/types/Calendar'
import { useSetRecoilState } from 'recoil'
import { EventInput } from '@fullcalendar/core'
import { calendarEventState } from '@/state/calendar.state'
import { useLazyQuery } from '@apollo/client'
import { GET_DATE_RANGE } from '@/graphql/_queries'
import dayjs from 'dayjs'
import { SIDE_MENU_TYPE } from '@/utils/constant'

export function useDateAPI(calendarRef: React.RefObject<FullCalendar>) {
  const setCalendarEvent = useSetRecoilState<EventInput[]>(calendarEventState)
  const [getDateRange] = useLazyQuery(GET_DATE_RANGE, {
    fetchPolicy: 'network-only',
  })

  const fetchDateRange = async () => {
    const calendarApi = calendarRef.current?.getApi()
    if (calendarApi) {
      const { currentStart, currentEnd } = calendarApi.view
      const startDate = dayjs(currentStart).format('YYYY-MM-DD')
      const endDate = dayjs(currentEnd).format('YYYY-MM-DD')
      const { data } = await getDateRange({
        variables: {
          start: startDate,
          end: endDate,
        },
      })
      const { findCalendarByRange } = data
      const calendarEvents = findCalendarByRange.reduce(
        (events: EventInput[], date: DATES) => {
          const diaries = date.diaries.map((diary) => {
            return {
              _id: diary._id,
              title: diary.title,
              content: diary.content,
              start: dayjs(date.date)
                .startOf('day')
                .format('YYYY-MM-DD HH:mm:ss'),
              end: dayjs(date.date).endOf('day').format('YYYY-MM-DD HH:mm:ss'),
              type: SIDE_MENU_TYPE.DIARY,
              allDay: true,
              color: '#8d4de2',
            }
          })
          const schedules = date.schedules.map((schedule) => {
            return {
              _id: schedule._id,
              title: schedule.title,
              start: schedule.start,
              end: schedule.end,
              type: SIDE_MENU_TYPE.SCHEDULE,
              color: '#506ee2',
            }
          })
          return events.concat(diaries).concat(schedules)
        },
        []
      ) as EventInput[]
      if (calendarEvents) {
        setCalendarEvent(calendarEvents)
      }
    }
  }

  return { fetchDateRange }
}
