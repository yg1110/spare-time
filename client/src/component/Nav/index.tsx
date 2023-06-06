import React from 'react'
import Box from '@mui/material/Box'
import BottomNavigation from '@mui/material/BottomNavigation'
import BottomNavigationAction from '@mui/material/BottomNavigationAction'
import CalendarViewMonthIcon from '@mui/icons-material/CalendarViewMonth'
import CalendarViewWeekIcon from '@mui/icons-material/CalendarViewWeek'
import WebAssetIcon from '@mui/icons-material/WebAsset'
import { CALENDAR_VIEW_MODE, MENUS } from '@/utils/constant'
import { useRecoilState } from 'recoil'
import { selectedMenuState } from '@/state/calendar.state'

interface Props {
  changeView: (view: string) => void
}

const Nav: React.FC<Props> = ({ changeView }) => {
  const [selectedMenu, setSelectedMenu] =
    useRecoilState<string>(selectedMenuState)

  const onChangeMenu = (
    event: React.SyntheticEvent,
    selectView: keyof typeof CALENDAR_VIEW_MODE
  ) => {
    changeView(selectView)
    setSelectedMenu(selectView)
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
