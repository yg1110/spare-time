import React, { useRef } from 'react'
import styled from 'styled-components'
import Image from 'next/image'
import closeButton from '@/images/close.png'
import styles from './modal.module.css'

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.7);
  z-index: 1300;
  display: flex;
  align-items: center;
  justify-content: center;
`

const Container = styled.div<{
  width: string | number
  height: string | number
}>`
  display: flex;
  position: relative;
  flex-direction: column;
  justify-content: space-between;
  width: ${(props) =>
    typeof props.width === 'number' ? `${props.width}px` : props.width};
  height: ${(props) =>
    typeof props.height === 'number' ? `${props.height}px` : props.height};
  background-color: white;
  border-radius: 6px;
`

interface ModalProps {
  visible: boolean
  children: any
  width: string | number
  height: string | number
  close: (e: React.MouseEvent<HTMLElement>) => void
}

export default function Modal(props: ModalProps): JSX.Element | null {
  const { visible, close, children } = props
  const overlayRef = useRef(null)
  const stopPropagation = (event: React.MouseEvent<HTMLElement>): void => {
    event.stopPropagation()
  }
  return visible ? (
    <Overlay onClick={close} ref={overlayRef}>
      <Container
        onClick={stopPropagation}
        width={props.width}
        height={props.height}
      >
        {children}
        <Image
          onClick={close}
          src={closeButton}
          alt={'close-button'}
          className={styles.closeButton}
        />
      </Container>
    </Overlay>
  ) : null
}
