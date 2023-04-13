import { Dayjs } from 'dayjs'

export function isValidDate(date: Dayjs) {
  return date.isValid()
}
