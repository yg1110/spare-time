import React, { useEffect } from 'react'
import { DATE, TIME } from '@/models/Calendar'
import dayjs, { Dayjs } from 'dayjs'
import { isValidDate } from '@/utils/helper'
import { EventInput } from '@fullcalendar/core'

interface Props {
  selectedDate: DATE
  submitEvent: (event: EventInput) => void
}

export function useCalendarModal(props: Props) {
  const { selectedDate, submitEvent } = props
  const [time, setTime] = React.useState<TIME>({
    startTime: dayjs().startOf('day'),
    endTime: dayjs(),
    title: '',
  })

  useEffect(() => {
    if (selectedDate) {
      const nowTime = dayjs(time.endTime).format('HH:mm:ss')
      const startDate = dayjs(selectedDate.date).format('YYYY-MM-DD')
      const endDate = dayjs(selectedDate.date).format('YYYY-MM-DD')
      setTime({
        ...time,
        startTime: dayjs(startDate + nowTime).startOf('day'),
        endTime: dayjs(endDate + nowTime),
      })
    }
  }, [selectedDate])

  async function handleSubmitSpareTime(): Promise<void> {
    const isValidStartDate = isValidDate(time.startTime)
    const isValidEndDate = isValidDate(time.endTime)
    if (!isValidStartDate) {
      alert('시작 시간을 선택해주세요.')
      return
    }
    if (!isValidEndDate) {
      alert('종료 시간을 선택해주세요.')
      return
    }
    const event = {
      title: time.title,
      start: dayjs(time.startTime).format('YYYY-MM-DD HH:mm:ss'),
      end: dayjs(time.endTime).format('YYYY-MM-DD HH:mm:ss'),
    }
    submitEvent(event)
    // const res = await createTime(submitTime)
    // if (res) {
    //   closeEvent()
    //   alert('Time Registration Success')
    // } else {
    //   alert(res)
    // }
  }

  function onChangeTime(name: string, selectTime: Dayjs | null) {
    if (selectTime) {
      setTime({
        ...time,
        [name]: dayjs(selectTime),
      })
    }
  }

  function onChangeValue(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target
    setTime({
      ...time,
      [name]: value,
    })
  }

  return { time, onChangeValue, onChangeTime, handleSubmitSpareTime }
}
