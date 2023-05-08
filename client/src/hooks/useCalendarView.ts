import { EventClickArg } from '@fullcalendar/core'
import { useRecoilState } from 'recoil'
import { calendarState } from '@/state/calendar.state'
import { DateClickArg } from '@fullcalendar/interaction'
import { calendarModalState } from '@/state/modal.state'
import { CALENDAR_STATE } from '@/models/Calendar'

export function useCalendarView() {
  const [showModal, setShowModal] = useRecoilState<boolean>(calendarModalState)
  const [calendar, setCalendar] = useRecoilState<CALENDAR_STATE>(calendarState)

  const handleDateSelect = (arg: DateClickArg) => {
    setShowModal(true)
    setCalendar({
      ...calendar,
      selectedDate: arg.date,
    })
  }

  function handleEventClick(clickInfo: EventClickArg) {
    console.log(`clickInfo`, clickInfo)

    if (
      confirm(
        `Are you sure you want to delete the event '${clickInfo.event.title}'`
      )
    ) {
      // eventStore.deleteEvent(clickInfo.event.id)
    }
  }

  return {
    showModal,
    calendar,
    handleEventClick,
    handleDateSelect,
  }
}
