import React from 'react'
import Box from '@mui/material/Box'
import BottomNavigation from '@mui/material/BottomNavigation'
import BottomNavigationAction from '@mui/material/BottomNavigationAction'
import CalendarViewMonthIcon from '@mui/icons-material/CalendarViewMonth'
import CalendarViewWeekIcon from '@mui/icons-material/CalendarViewWeek'
import WebAssetIcon from '@mui/icons-material/WebAsset'
import AddIcon from '@mui/icons-material/Add'
import { CALENDAR_VIEW_MODE, MENUS } from '@/utils/constant'
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'
import {
  calendarTitleState,
  selectedDateState,
  selectedMenuState,
} from '@/state/calendar.state'
import FullCalendar from '@fullcalendar/react'
import { calendarModalState } from '@/state/modal.state'
import dayjs from 'dayjs'

interface Props {
  calendarRef: React.RefObject<FullCalendar>
  changeView: (view: string) => void
}

const Nav: React.FC<Props> = ({ calendarRef, changeView }) => {
  const [selectedMenu, setSelectedMenu] =
    useRecoilState<string>(selectedMenuState)
  const selectedDate = useRecoilValue<Date | undefined>(selectedDateState)
  const setTitle = useSetRecoilState<string>(calendarTitleState)
  const setShowModal = useSetRecoilState<boolean>(calendarModalState)
  const setSelectedDate = useSetRecoilState<Date | undefined>(selectedDateState)

  const onChangeMenu = (
    event: React.SyntheticEvent,
    selectView: keyof typeof CALENDAR_VIEW_MODE
  ) => {
    if (selectView === CALENDAR_VIEW_MODE.ADD) {
      setShowModal(true)
      setSelectedDate(dayjs().startOf('hour').toDate())
      return
    }

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
        <BottomNavigationAction
          label={MENUS.ADD}
          value={CALENDAR_VIEW_MODE.ADD}
          icon={<AddIcon />}
        ></BottomNavigationAction>
      </BottomNavigation>
    </Box>
  )
}

export default Nav
