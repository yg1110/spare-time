import React from 'react'
import dayjs from 'dayjs'
import FullCalendar from '@fullcalendar/react'
import { DATES, DIARY } from '@/types/Calendar'
import { useSetRecoilState } from 'recoil'
import { EventInput } from '@fullcalendar/core'
import { calendarEventState, diaryState } from '@/state/calendar.state'
import { useLazyQuery, useMutation } from '@apollo/client'
import { GET_DIARIES_RANGE, GET_DIARY_ID } from '@/graphql/_queries'
import { DELETE_DIARY, EDIT_DIARY, INSERT_DIARY } from '@/graphql/_mutaions'

export function useDiaryAPI(calendarRef: React.RefObject<FullCalendar>) {
  const setDiary = useSetRecoilState<DIARY>(diaryState)
  const setCalendarEvent = useSetRecoilState<EventInput[]>(calendarEventState)
  const [getDiariesRange] = useLazyQuery(GET_DIARIES_RANGE)
  const [getDiaryId] = useLazyQuery(GET_DIARY_ID)
  const [insertDiary] = useMutation(INSERT_DIARY)
  const [editDiary] = useMutation(EDIT_DIARY)
  const [removeDiary] = useMutation(DELETE_DIARY)

  const fetchDiariesRange = async () => {
    const calendarApi = calendarRef.current?.getApi()
    if (calendarApi) {
      const { currentStart, currentEnd } = calendarApi.view
      const startDate = dayjs(currentStart).format('YYYY-MM-DD')
      const endDate = dayjs(currentEnd).format('YYYY-MM-DD')
      const { data } = await getDiariesRange({
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
    const { data } = await getDiaryId({
      variables: {
        diaryId: diaryId,
      },
    })
    const { findCalendarById } = data
    setDiary(findCalendarById.diaries)
  }

  const createDiary = async (diary: EventInput) => {
    await insertDiary({
      variables: {
        ...diary,
      },
    })
    await fetchDiariesRange()
  }

  const updateDiary = async (diaryId: string, diary: EventInput) => {
    await editDiary({
      variables: {
        diaryId: diaryId,
        ...diary,
      },
    })
    await fetchDiariesRange()
  }

  const deleteDiary = async (diaryId: string) => {
    await removeDiary({
      variables: {
        diaryId: diaryId,
      },
    })
    await fetchDiariesRange()
  }

  return {
    createDiary,
    fetchDiariesRange,
    fetchDiaryById,
    updateDiary,
    deleteDiary,
  }
}
