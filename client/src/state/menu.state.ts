import { atom } from 'recoil'
import { SIDE_MENU_TYPE } from '@/utils/constant'

export const sideMenuState = atom<string>({
  key: 'sideMenuState',
  default: SIDE_MENU_TYPE.SCHEDULE,
})
