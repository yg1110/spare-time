import React from 'react'
import Box from '@mui/material/Box'
import BottomNavigation from '@mui/material/BottomNavigation'
import BottomNavigationAction from '@mui/material/BottomNavigationAction'
import CalendarViewMonthIcon from '@mui/icons-material/CalendarViewMonth'
import CalendarViewWeekIcon from '@mui/icons-material/CalendarViewWeek'
import WebAssetIcon from '@mui/icons-material/WebAsset'
import { CALENDAR_VIEW_MODE, MENUS } from '@/utils/constant'
import { useRecoilState, useSetRecoilState } from 'recoil'
import { calendarTitleState, selectedMenuState } from '@/state/calendar.state'
import FullCalendar from '@fullcalendar/react'

interface Props {
  calendarRef: React.RefObject<FullCalendar>
  changeView: (view: string) => void
}

const Nav: React.FC<Props> = ({ calendarRef, changeView }) => {
  const [selectedMenu, setSelectedMenu] =
    useRecoilState<string>(selectedMenuState)
  const setTitle = useSetRecoilState<string>(calendarTitleState)

  const onChangeMenu = (
    event: React.SyntheticEvent,
    selectView: keyof typeof CALENDAR_VIEW_MODE
  ) => {
    changeView(selectView)
    setSelectedMenu(selectView)

    const calendarApi = calendarRef.current?.getApi()
    if (calendarApi) {
      setTitle(calendarApi?.view?.title ?? '')
    }
  }

  return (
    <Box>
      <BottomNavigation showLabels value={selectedMenu} onChange={onChangeMenu}>
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
      </BottomNavigation>
    </Box>
  )
}

export default Nav
