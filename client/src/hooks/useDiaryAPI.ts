import React from 'react'
import dayjs from 'dayjs'
import FullCalendar from '@fullcalendar/react'
import { DATES, DIARY } from '@/types/Calendar'
import { useSetRecoilState } from 'recoil'
import { EventInput } from '@fullcalendar/core'
import { calendarEventState, diaryState } from '@/state/calendar.state'
import {
  createDiaries,
  deleteDiaries,
  getDiaries,
  getDiariesRange,
  getDiaryById,
  updateDiaries,
} from '@/services/diaries.service'

export function useDiaryAPI(calendarRef: React.RefObject<FullCalendar>) {
  const setDiary = useSetRecoilState<DIARY>(diaryState)
  const setCalendarEvent = useSetRecoilState<EventInput[]>(calendarEventState)

  const fetchDiaries = async () => {
    const calendarApi = calendarRef.current?.getApi()
    if (calendarApi) {
      const date = dayjs(calendarApi.getDate()).format('YYYY-MM-DD')
      const schedule = await getDiaries<EventInput[]>(date)
      if (schedule && schedule.length > 0) {
        setCalendarEvent(schedule)
      }
    }
  }

  const fetchDiariesRange = async () => {
    const calendarApi = calendarRef.current?.getApi()
    if (calendarApi) {
      const { currentStart, currentEnd } = calendarApi.view
      const startDate = dayjs(currentStart).format('YYYY-MM-DD')
      const endDate = dayjs(currentEnd).format('YYYY-MM-DD')
      const dates = await getDiariesRange<DATES[]>(startDate, endDate)
      const calendarEvents = dates.reduce(
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
            }
          })
          return events.concat(diaries)
        },
        []
      ) as EventInput[]
      if (calendarEvents) {
        setCalendarEvent(calendarEvents)
      }
    }
  }

  const fetchDiaryById = async (diaryId: string) => {
    const updateDiary = await getDiaryById<DIARY>(diaryId)
    setDiary(updateDiary)
  }

  const createDiary = async (diary: EventInput) => {
    await createDiaries(diary)
    await fetchDiariesRange()
  }

  const updateDiary = async (diaryId: string, schedule: EventInput) => {
    await updateDiaries(diaryId, schedule)
    await fetchDiariesRange()
  }

  const deleteDiary = async (diaryId: string) => {
    await deleteDiaries(diaryId)
    await fetchDiariesRange()
  }

  return {
    fetchDiaries,
    createDiary,
    fetchDiariesRange,
    fetchDiaryById,
    updateDiary,
    deleteDiary,
  }
}
