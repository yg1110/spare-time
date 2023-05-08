import React from 'react'
import { CALENDAR_VIEW_MODE } from '@/utils/constant'
import { useRecoilState } from 'recoil'
import { calendarState } from '@/state/calendar.state'
import { CALENDAR_STATE } from '@/models/Calendar'
import FullCalendar from '@fullcalendar/react'

export function useNav(calendarRef: React.RefObject<FullCalendar>) {
  const [dateState, setDateState] =
    useRecoilState<CALENDAR_STATE>(calendarState)

  const onChangeMenu = (
    event: React.SyntheticEvent,
    newValue: keyof typeof CALENDAR_VIEW_MODE
  ) => {
    const calendarApi = calendarRef.current?.getApi()
    if (typeof newValue === 'string') {
      if (calendarApi) {
        calendarApi.changeView(newValue)
        setDateState({
          ...dateState,
          selectedMenu: newValue,
          title: calendarApi?.view?.title ?? '',
        })
      }
    }
    if (typeof newValue === 'number') {
      if (calendarApi) {
        calendarApi.today()
        setDateState({
          ...dateState,
          title: calendarApi?.view?.title ?? '',
        })
      }
    }
  }
  return {
    selectedMenu: dateState.selectedMenu,
    onChangeMenu: onChangeMenu,
  }
}
