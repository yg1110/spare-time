import React from 'react'
import CalendarView from '@/component/CalendarView'
import Nav from '@/component/Nav'
import CssBaseline from '@mui/material/CssBaseline'
import AppHeader from '@/component/Menu/AppHeader'
import Box from '@mui/material/Box'
import FullCalendar from '@fullcalendar/react'
import { styled } from '@mui/material/styles'

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })<{
  open?: boolean
}>(() => ({
  width: '100%',
}))

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}))

const Calendar: React.FC = () => {
  const calendarRef = React.useRef<FullCalendar>(null)
  const [open, setOpen] = React.useState(false)

  const changeView = (view: string) => {
    const calendarApi = calendarRef.current?.getApi()
    if (calendarApi) {
      calendarApi?.changeView(view)
    }
  }

  return (
    <Box sx={{ display: 'flex', height: 'calc(100vh - 56px)' }}>
      <CssBaseline />
      {/** 상단 헤더 **/}
      <AppHeader
        open={open}
        isGuest={true}
        setOpen={setOpen}
        calendarRef={calendarRef}
      />
      {/** 메인 컴포넌트 **/}
      <Main open={open}>
        <DrawerHeader />
        <div className="calendar-container">
          <CalendarView isGuest={true} calendarRef={calendarRef} />
          <Nav
            isGuest={true}
            calendarRef={calendarRef}
            changeView={changeView}
          />
        </div>
      </Main>
    </Box>
  )
}

export default React.memo(Calendar)
