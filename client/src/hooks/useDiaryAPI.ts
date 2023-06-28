import React from 'react'
import FullCalendar from '@fullcalendar/react'
import { DIARY } from '@/types/Calendar'
import { useSetRecoilState } from 'recoil'
import { EventInput } from '@fullcalendar/core'
import { diaryState } from '@/state/calendar.state'
import { useLazyQuery, useMutation } from '@apollo/client'
import { GET_DIARY_ID } from '@/graphql/_queries'
import { DELETE_DIARY, EDIT_DIARY, INSERT_DIARY } from '@/graphql/_mutaions'
import { useDateAPI } from '@/hooks/useDateAPI'

export function useDiaryAPI(calendarRef: React.RefObject<FullCalendar>) {
  const setDiary = useSetRecoilState<DIARY>(diaryState)
  const { fetchDateRange } = useDateAPI(calendarRef)
  const [getDiaryId] = useLazyQuery(GET_DIARY_ID)
  const [insertDiary] = useMutation(INSERT_DIARY)
  const [editDiary] = useMutation(EDIT_DIARY)
  const [removeDiary] = useMutation(DELETE_DIARY)

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
    await fetchDateRange()
  }

  const updateDiary = async (diaryId: string, diary: EventInput) => {
    await editDiary({
      variables: {
        diaryId: diaryId,
        ...diary,
      },
    })
    await fetchDateRange()
  }

  const deleteDiary = async (diaryId: string) => {
    await removeDiary({
      variables: {
        diaryId: diaryId,
      },
    })
    await fetchDateRange()
  }

  return {
    createDiary,
    fetchDiaryById,
    updateDiary,
    deleteDiary,
  }
}
