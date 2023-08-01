import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'
import LockOpenIcon from '@mui/icons-material/LockOpen'
import React from 'react'
import CalendarHeader from '@/component/Menu/CalendarHeader'
import FullCalendar from '@fullcalendar/react'
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar'
import { styled } from '@mui/material/styles'
import { URL_PATH } from '@/utils/constant'
import { useRouter } from 'next/router'

interface AppBarProps extends MuiAppBarProps {
  open?: boolean
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(() => ({
  width: '100%',
}))

interface Props {
  isGuest: boolean
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
  calendarRef: React.RefObject<FullCalendar>
}

const AppHeader: React.FC<Props> = ({
  calendarRef,
  isGuest,
  open,
  setOpen,
}) => {
  const router = useRouter()

  const onDrawerOpen = () => {
    setOpen(true)
  }

  const onLogout = async () => {
    await router.push(URL_PATH.CALENDAR_PATH)
  }

  return (
    <AppBar position="fixed" open={open}>
      <Toolbar>
        {!isGuest ? (
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={onDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(open && { display: 'none' }) }}
          >
            <MenuIcon />
          </IconButton>
        ) : (
          <IconButton
            color="inherit"
            aria-label="logout"
            onClick={onLogout}
            edge="start"
            sx={{ mr: 2, ...(open && { display: 'none' }) }}
          >
            <LockOpenIcon />
          </IconButton>
        )}
        <CalendarHeader calendarRef={calendarRef} />
      </Toolbar>
    </AppBar>
  )
}

export default AppHeader
