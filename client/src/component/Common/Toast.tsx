import React from 'react'
import { Alert, Snackbar } from '@mui/material'

interface ToastProps {
  open: boolean
  message: string
  onChangeState: (open: boolean) => void
  vertical: 'top' | 'bottom'
  horizontal: 'right' | 'left' | 'center'
  type?: 'success' | 'info' | 'warning' | 'error'
}

export const Toast: React.FC<ToastProps> = ({
  open,
  type,
  message,
  onChangeState,
  vertical,
  horizontal,
}) => {
  const onClose = () => {
    onChangeState(false)
  }

  return (
    <Snackbar
      anchorOrigin={{ vertical, horizontal }}
      open={open}
      key={vertical + horizontal}
    >
      <Alert onClose={onClose} severity={type || 'info'} sx={{ width: '100%' }}>
        {message}
      </Alert>
    </Snackbar>
  )
}
