import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'
import React from 'react'
import CalendarHeader from '@/component/Menu/CalendarHeader'
import FullCalendar from '@fullcalendar/react'
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar'
import { styled } from '@mui/material/styles'

interface AppBarProps extends MuiAppBarProps {
  open?: boolean
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(() => ({
  width: '100%',
}))

interface Props {
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
  calendarRef: React.RefObject<FullCalendar>
}

const AppHeader: React.FC<Props> = ({ calendarRef, open, setOpen }) => {
  const onDrawerOpen = () => {
    setOpen(true)
  }

  return (
    <AppBar position="fixed" open={open}>
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={onDrawerOpen}
          edge="start"
          sx={{ mr: 2, ...(open && { display: 'none' }) }}
        >
          <MenuIcon />
        </IconButton>
        <CalendarHeader calendarRef={calendarRef} />
      </Toolbar>
    </AppBar>
  )
}

export default AppHeader
