import React from 'react'
import Box from '@mui/material/Box'
import BottomNavigation from '@mui/material/BottomNavigation'
import BottomNavigationAction from '@mui/material/BottomNavigationAction'
import CalendarViewMonthIcon from '@mui/icons-material/CalendarViewMonth'
import CalendarViewWeekIcon from '@mui/icons-material/CalendarViewWeek'
import WebAssetIcon from '@mui/icons-material/WebAsset'
import FullCalendar from '@fullcalendar/react'
import { CALENDAR_VIEW_MODE, MENUS } from '@/utils/constant'
import { useNav } from '@/hooks/useNav'

interface Props {
  calendarRef: React.RefObject<FullCalendar>
}

const Nav: React.FC<Props> = ({ calendarRef }) => {
  const { selectedMenu, onChangeMenu } = useNav(calendarRef)
  return (
    <Box>
      <BottomNavigation showLabels value={selectedMenu} onChange={onChangeMenu}>
        {/*<BottomNavigationAction label={MENUS.TODAY} icon={<TodayIcon />} />*/}
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
        {/*<BottomNavigationAction*/}
        {/*  href={'/add'}*/}
        {/*  component={Link}*/}
        {/*  label={MENUS.ADD}*/}
        {/*  icon={<AddIcon />}*/}
        {/*></BottomNavigationAction>*/}
      </BottomNavigation>
    </Box>
  )
}

export default Nav
