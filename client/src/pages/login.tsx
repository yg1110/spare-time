import React, { useEffect } from 'react'
import styled from 'styled-components'
import { Auth } from '@/types/Auth'
import { Toast } from '@/component/Common/Toast'
import { signIn, useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { URL_PATH } from '@/utils/constant'

const Container = styled.div`
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`

const RowContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`

const Label = styled.label`
  font-size: 18px;
`

const Input = styled.input`
  width: 100%;
  height: 54px;
  font-size: 18px;
  padding: 16.5px 14px;
  border-radius: 5px;
  border: #ddd 1px solid;
`

const SubmitButton = styled.div`
  height: 50px;
  background-color: #6a92fe;
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
`

const SubmitButtonText = styled.p`
  color: white;
  font-size: 15px;
  font-weight: 600;
`

const RightTextContainer = styled.div`
  display: flex;
  justify-content: right;
  height: 100%;
  gap: 5px;
`

const TextLink = styled.a`
  color: #a19c94;
  text-align: right;

  &:link {
    text-decoration: none;
  }

  &:visited {
    text-decoration: none;
  }

  &:hover {
    text-decoration: none;
  }

  &:active {
    text-decoration: none;
  }
`

const Divider = styled.div`
  color: #a19c94;
  font-weight: 600;

  &:after {
    content: '|';
  }
`

interface Toast {
  open: boolean
  message: string
  type: 'success' | 'info' | 'warning' | 'error'
}

interface CustomError extends Error {
  data: any
  status: number
  headers: string
}

const Login: React.FC = () => {
  const { data: session, status } = useSession()
  const router = useRouter()

  const [toast, setToast] = React.useState<Toast>({
    open: false,
    type: 'success',
    message: '',
  })

  const [userInfo, setUserInfo] = React.useState<Auth>({
    id: '',
    password: '',
  })

  function onChangeValue(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target
    setUserInfo({
      ...userInfo,
      [name]: value,
    })
  }

  async function onSubmit() {
    try {
      await signIn('credential', {
        id: userInfo.id,
        password: userInfo.password,
        redirect: false,
        callbackUrl: URL_PATH.CALENDAR_PATH,
      })
    } catch (err: unknown) {
      const customErr = err as CustomError
      setToast({
        ...toast,
        open: true,
        type: 'error',
        message: customErr.data.data,
      })
    }
  }

  const onChangeState = (open: boolean) => {
    setToast({
      ...toast,
      open,
    })
  }

  useEffect(() => {
    if (session?.user) router.push(URL_PATH.CALENDAR_PATH)
  }, [session])

  return status === 'loading' ? (
    <div>loading</div>
  ) : (
    <React.Fragment>
      <Container>
        <RowContainer>
          <Label>ID</Label>
          <Input
            name="id"
            placeholder="ID"
            value={userInfo.id}
            onChange={onChangeValue}
          />
          <Label>Password</Label>
          <Input
            name="password"
            type="password"
            placeholder="Password"
            value={userInfo.password}
            onChange={onChangeValue}
          />
          <SubmitButton onClick={onSubmit}>
            <SubmitButtonText>로그인</SubmitButtonText>
          </SubmitButton>
          <RightTextContainer>
            <TextLink href="/signup">회원가입</TextLink>
            <Divider></Divider>
            <TextLink href="/find-password">비밀번호 찾기</TextLink>
          </RightTextContainer>
        </RowContainer>
      </Container>
      <Toast
        open={toast.open}
        type={toast.type}
        message={toast.message}
        onChangeState={onChangeState}
        vertical="top"
        horizontal="left"
      />
    </React.Fragment>
  )
}

export default Login
