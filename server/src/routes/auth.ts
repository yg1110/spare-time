import { Request, Response } from 'express'
import User, { IUsers } from '../db/models/user'

declare module 'express-session' {
  interface SessionData {
    authenticated: boolean
  }
}

export const check = async (req: Request, res: Response) => {
  return res.status(200).send({ data: req.session?.authenticated ?? false })
}

export const login = async (req: Request, res: Response) => {
  const { id, password } = req.body
  if (req.session.authenticated) {
    res.status(200).send({ data: req.session.authenticated })
  } else {
    const userInfo = await User.findOne<IUsers>({
      id,
      password,
    })
    if (userInfo) {
      req.session.authenticated = true
      res.status(200).send({ data: req.session.authenticated })
    } else {
      res.status(400).send({ data: '로그인 정보가 올바르지 않습니다.' })
    }
  }
}

export const logout = async (req: Request, res: Response) => {
  if (req.session.authenticated) {
    req.session.destroy((err) => {
      if (err) {
        console.log('세션 삭제시에 에러가 발생했습니다.')
        return
      }
      console.log('세션이 삭제됐습니다.')
      res.status(200).send({ data: '세션이 삭제됐습니다.' })
    })
  } else {
    console.log('로그인 정보가 올바르지 않습니다.')
    res.status(400).send({ data: '로그인 정보가 올바르지 않습니다.' })
  }
}

export const signup = async (req: Request, res: Response) => {
  const { id, password, rePassword, name, answer, question } = req.body

  const user: IUsers = new User({
    id,
    password,
    rePassword,
    name,
    answer,
    question,
  })
  try {
    const addUsers = await user.save()
    res.status(200).send({ data: addUsers })
  } catch (error) {
    console.error('signup ERROR : ', error)
    res.status(400).send({ data: '유저를 추가하던 도중 에러가 발생했습니다.' })
  }
}

export const profile = async (req: Request, res: Response) => {
  const { id, password } = req.body
  const user = await User.findOne({
    where: { id, password },
  })
  try {
    res.status(200).send({ data: user })
  } catch (error) {
    console.error('profile ERROR : ', error)
    res.status(400).send({ data: '유저를 추가하던 도중 에러가 발생했습니다.' })
  }
}

export const password = async (req: Request, res: Response) => {
  const { id, question, answer } = req.body
  const userInfo = await User.findOne({
    id,
    question,
    answer,
  })
  if (userInfo) {
    res.status(200).send({ data: userInfo })
  } else {
    const userInfo = await User.findOne({
      id,
    })
    res.status(400).send({
      data: userInfo
        ? '비밀번호 찾기 질문이 맞지 않습니다.'
        : '아이디가 존재하지 않습니다.',
    })
  }
}
