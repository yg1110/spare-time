import React, { useEffect } from 'react'
import styled from 'styled-components'
import FullCalendar from '@fullcalendar/react'
import { ArrowBackIos, ArrowForwardIos } from '@mui/icons-material'
import { useRecoilState, useRecoilValue } from 'recoil'
import { calendarTitleState } from '@/state/calendar.state'
import { useScheduleAPI } from '@/hooks/useScheduleAPI'
import { sideMenuState } from '@/state/menu.state'
import { useDiaryAPI } from '@/hooks/useDiaryAPI'
import { SIDE_MENU_TYPE } from '@/utils/constant'

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  height: 56px;
  width: 100%;
  align-items: center;
  text-align: center;
`

const ButtonWrapper = styled.div``
const Title = styled.h1`
  font-size: 1rem;
`

interface Props {
  calendarRef: React.RefObject<FullCalendar>
}

const CalendarHeader: React.FC<Props> = ({ calendarRef }) => {
  const { fetchScheduleRange } = useScheduleAPI(calendarRef)
  const { fetchDiariesRange } = useDiaryAPI(calendarRef)
  const [title, setTitle] = useRecoilState<string>(calendarTitleState)
  const sideMenu = useRecoilValue(sideMenuState)

  useEffect(() => {
    if (sideMenu === SIDE_MENU_TYPE.SCHEDULE) {
      fetchScheduleRange()
    }
    if (sideMenu === SIDE_MENU_TYPE.DIARY) {
      fetchDiariesRange()
    }
  }, [title])

  const onPrev = async () => {
    const calendarApi = calendarRef.current?.getApi()
    if (calendarApi) {
      calendarApi.prev()
      await fetchScheduleRange()
      setTitle(calendarApi?.view?.title ?? '')
    }
  }

  const onNext = async () => {
    const calendarApi = calendarRef.current?.getApi()
    if (calendarApi) {
      calendarApi.next()
      await fetchScheduleRange()
      setTitle(calendarApi?.view?.title ?? '')
    }
  }

  return (
    <Header>
      <Title>{title}</Title>
      <ButtonWrapper>
        <ArrowBackIos onClick={onPrev} />
        <ArrowForwardIos onClick={onNext} />
      </ButtonWrapper>
    </Header>
  )
}

export default CalendarHeader
