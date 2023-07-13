import React from 'react'
import styled from 'styled-components'
import { Auth } from '@/types/Auth'
import { useRouter } from 'next/router'
import { login } from '@/services/auth.service'

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

const Login: React.FC = () => {
  const router = useRouter()
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
    const user = await login(userInfo)
    console.log(`user`, user)
    // await router.push('/calendar')
  }

  return (
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
  )
}

export default Login
