import { atom } from 'recoil'

export const calendarModalState = atom<boolean>({
  key: 'calendarModalState',
  default: false,
})
