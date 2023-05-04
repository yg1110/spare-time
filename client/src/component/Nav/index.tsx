import React from 'react'
import Box from '@mui/material/Box'
import BottomNavigation from '@mui/material/BottomNavigation'
import BottomNavigationAction from '@mui/material/BottomNavigationAction'
import CalendarViewMonthIcon from '@mui/icons-material/CalendarViewMonth'
import CalendarViewWeekIcon from '@mui/icons-material/CalendarViewWeek'
import AddIcon from '@mui/icons-material/Add'
import TodayIcon from '@mui/icons-material/Today'
import WebAssetIcon from '@mui/icons-material/WebAsset'
import FullCalendar from '@fullcalendar/react'
import { useRecoilState } from 'recoil'
import { calendarTitleState } from '@/state/calendar.state'
import { CALENDAR_VIEW_MODE, MENUS } from '@/utils/constant'

interface Props {
  calendarRef: React.RefObject<FullCalendar>
}

const Nav: React.FC<Props> = ({ calendarRef }) => {
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

  return (
    <Box>
      <BottomNavigation showLabels value={value} onChange={onChangeMenu}>
        <BottomNavigationAction label={MENUS.TODAY} icon={<TodayIcon />} />
        <BottomNavigationAction
          label={MENUS.MONTH}
          value={CALENDAR_VIEW_MODE.MONTH}
          icon={<CalendarViewMonthIcon />}
        />
        <BottomNavigationAction
          label={MENUS.WEEK}
          value={CALENDAR_VIEW_MODE.WEEK}
          icon={<CalendarViewWeekIcon />}
        />
        <BottomNavigationAction
          label={MENUS.DAY}
          value={CALENDAR_VIEW_MODE.DAY}
          icon={<WebAssetIcon />}
        />
        <BottomNavigationAction label={MENUS.ADD} icon={<AddIcon />} />
      </BottomNavigation>
    </Box>
  )
}

export default Nav
