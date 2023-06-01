import { Dayjs } from 'dayjs'

export function isValidDate(date: Dayjs) {
  return date.isValid()
}

export function isValidValue(value: string) {
  return value !== '' && value !== undefined
}
