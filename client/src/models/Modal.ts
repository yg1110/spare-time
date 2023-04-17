import React from 'react'

export interface ModalProps {
  visible: boolean
  children: any
  width: number
  close: (e: React.MouseEvent<HTMLElement>) => void
}
