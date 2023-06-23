import React from 'react'
import Box from '@mui/material/Box'
import CssBaseline from '@mui/material/CssBaseline'
import FullCalendar from '@fullcalendar/react'
import AppHeader from '@/component/Menu/AppHeader'
import SideMenu from '@/component/Menu/SideMenu'
import { styled } from '@mui/material/styles'
import { RecoilRoot } from 'recoil'
import { AppProps } from 'next/app'
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client'
import '@/styles/globals.css'

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

const client = new ApolloClient({
  uri: 'https://15.165.162.58:4000/graphql',
  cache: new InMemoryCache(),
})

export default function App({ Component, pageProps }: AppProps) {
  const calendarRef = React.useRef<FullCalendar>(null)
  const [open, setOpen] = React.useState(false)

  return (
    <ApolloProvider client={client}>
      <RecoilRoot>
        <Box sx={{ display: 'flex', height: 'calc(100vh - 56px)' }}>
          <CssBaseline />
          {/** 상단 헤더 **/}
          <AppHeader open={open} setOpen={setOpen} calendarRef={calendarRef} />
          {/** 사이드 메뉴 **/}
          <SideMenu open={open} setOpen={setOpen} calendarRef={calendarRef} />
          {/** 메인 컴포넌트 **/}
          <Main open={open}>
            <DrawerHeader />
            <Component calendarRef={calendarRef} {...pageProps} />
          </Main>
        </Box>
      </RecoilRoot>
    </ApolloProvider>
  )
}
