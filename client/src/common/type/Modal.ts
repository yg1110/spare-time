import React from 'react'

export interface ModalProps {
  visible: boolean
  children: any
  close: (e: React.MouseEvent<HTMLElement>) => void
}
