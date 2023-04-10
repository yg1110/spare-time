import React from 'react'
import styled from 'styled-components'
import closeButton from '../../assets/images/close.png'
import { ModalProps } from '../../common/type/Modal'

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.7);
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: center;
`

const Container = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
  justify-content: space-between;
  width: 500px;
  height: 500px;
  background-color: white;
  border-radius: 6px;
`

const Image = styled.img`
  position: absolute;
  width: 24px;
  height: 24px;
  top: 30px;
  right: 30px;
  cursor: pointer;
`

export default function Modal(props: ModalProps) {
  const { visible, close, children } = props
  return visible ? (
    <Overlay onClick={close}>
      <Container>
        {children}
        <Image onClick={close} src={closeButton} alt={'close-button'} />
      </Container>
    </Overlay>
  ) : null
}
