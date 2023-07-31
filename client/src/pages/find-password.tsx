import React from 'react'
import styled from 'styled-components'
import { Auth } from '@/types/Auth'
import { PASSWORD_QUESTION } from '@/utils/constant'
import { MenuItem, Select, SelectChangeEvent } from '@mui/material'
import { password } from '@/services/auth.service'

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

const FindPassword: React.FC = () => {
  const [userInfo, setUserInfo] = React.useState<Auth>({
    id: '',
    question: PASSWORD_QUESTION[0],
    answer: '',
  })

  function onChangeValue(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target
    setUserInfo({
      ...userInfo,
      [name]: value,
    })
  }

  async function onSubmit() {
    const { id, question, answer } = userInfo
    if (!id) {
      alert('아이디를 입력해주세요.')
      return
    }
    if (!question) {
      alert('패스워드 질문을 입력해주세요.')
      return
    }
    if (!answer) {
      alert('패스워드 답변을 입력해주세요.')
      return
    }
    if (userInfo) {
      const findUserInfo = await password<Auth>(userInfo)
      if (findUserInfo) {
        alert(findUserInfo.password)
      }
    }
    // await router.push('/calendar')
  }

  function onChangeSelect(event: SelectChangeEvent) {
    setUserInfo({
      ...userInfo,
      question: event.target.value,
    })
  }

  return (
    <Container>
      <RowContainer>
        <Label>아이디</Label>
        <Input
          name="id"
          placeholder="아이디"
          value={userInfo.id}
          onChange={onChangeValue}
        />
        <Label>패스워드 질문</Label>
        <Select
          labelId="question"
          label="question"
          value={userInfo.question}
          onChange={onChangeSelect}
        >
          {PASSWORD_QUESTION.map((item) => (
            <MenuItem value={item} key={item}>
              {item}
            </MenuItem>
          ))}
        </Select>
        <Label>패스워드 답변</Label>
        <Input
          name="answer"
          placeholder="패스워드 답변"
          value={userInfo.answer}
          onChange={onChangeValue}
        />
        <SubmitButton onClick={onSubmit}>
          <SubmitButtonText>패스워드 찾기</SubmitButtonText>
        </SubmitButton>
        <RightTextContainer>
          <TextLink href="/login">로그인 하러 가기</TextLink>
        </RightTextContainer>
      </RowContainer>
    </Container>
  )
}

export default FindPassword
