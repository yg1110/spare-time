import React from 'react'
import FullCalendar from '@fullcalendar/react'
import { CALENDAR_VIEW_MODE } from '@/utils/constant'
import { useRecoilState } from 'recoil'
import { calendarTitleState } from '@/state/calendar.state'

export function useNav(calendarRef: React.RefObject<FullCalendar>) {
  const [value, setValue] = React.useState<string>(CALENDAR_VIEW_MODE.WEEK)
  const [_, setTitle] = useRecoilState<string>(calendarTitleState)

  const onChangeMenu = (
    event: React.SyntheticEvent,
    newValue: keyof typeof CALENDAR_VIEW_MODE
  ) => {
    const calendarApi = calendarRef.current?.getApi()

    if (typeof newValue === 'string') {
      setValue(newValue)
      if (calendarApi) {
        calendarApi.changeView(newValue)
        setTitle(calendarApi?.view?.title ?? '')
      }
    }
    if (typeof newValue === 'number') {
      if (calendarApi) {
        calendarApi.today()
        setTitle(calendarApi?.view?.title ?? '')
      }
    }
  }
  return { value, onChangeMenu }
}
