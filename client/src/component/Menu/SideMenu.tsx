import React from 'react'
import IconButton from '@mui/material/IconButton'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import Divider from '@mui/material/Divider'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import Drawer from '@mui/material/Drawer'
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth'
import EventNoteIcon from '@mui/icons-material/EventNote'
import { styled, useTheme } from '@mui/material/styles'
import { SIDE_MENU_TYPE } from '@/utils/constant'
import { SvgIconProps } from '@mui/material'
import { useRecoilState } from 'recoil'
import { sideMenuState } from '@/state/menu.state'
import FullCalendar from '@fullcalendar/react'
import { useDateAPI } from '@/hooks/useDateAPI'

type MENU_TYPE = {
  menu: string
  icon: React.ReactElement<SvgIconProps>
}

const SIDE_MENU: MENU_TYPE[] = [
  {
    menu: SIDE_MENU_TYPE.SCHEDULE,
    icon: <CalendarMonthIcon />,
  },
  {
    menu: SIDE_MENU_TYPE.DIARY,
    icon: <EventNoteIcon />,
  },
]

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}))

interface Props {
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
  calendarRef: React.RefObject<FullCalendar>
}

const SideMenu: React.FC<Props> = ({ open, setOpen, calendarRef }) => {
  const theme = useTheme()
  const { fetchDateRange } = useDateAPI(calendarRef)
  const [sideMenu, setSideMenu] = useRecoilState(sideMenuState)

  const onDrawerClose = () => {
    setOpen(false)
  }

  const onSelectSideMenu = async (menu: string) => {
    setSideMenu(menu)
    await fetchDateRange()
    setOpen(false)
  }

  return (
    <Drawer open={open}>
      <DrawerHeader>
        <IconButton onClick={onDrawerClose}>
          {theme.direction === 'ltr' ? (
            <ChevronLeftIcon />
          ) : (
            <ChevronRightIcon />
          )}
        </IconButton>
      </DrawerHeader>
      <Divider />
      <List>
        {SIDE_MENU.map(({ menu, icon }) => (
          <ListItem
            key={menu}
            disablePadding
            onClick={() => onSelectSideMenu(menu)}
          >
            <ListItemButton>
              <ListItemIcon
                style={{
                  color: sideMenu === menu ? '#1890ff' : 'rgb(5, 30, 52)',
                }}
              >
                {icon}
              </ListItemIcon>
              <ListItemText
                primary={menu}
                primaryTypographyProps={{
                  color: sideMenu === menu ? '#1890ff' : 'rgb(5, 30, 52)',
                }}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Drawer>
  )
}

export default SideMenu
