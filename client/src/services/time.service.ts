import axios, { AxiosError } from 'axios'
import { NEXT_APP_API_SERVER_URL } from '../config'
import { TIME } from '../models/Calendar'

export const createTime = async <T>(time: TIME): Promise<T> => {
  const url = NEXT_APP_API_SERVER_URL + '/api/time'
  try {
    return await axios.post(url, time)
  } catch (error) {
    const { response } = error as unknown as AxiosError
    if (response) {
      throw { status: response.status, data: response.data }
    }
    throw error
  }
}

export const getHours = async <T>(date: string): Promise<T> => {
  const url = NEXT_APP_API_SERVER_URL + `/api/time/${date}`
  try {
    const { data } = await axios.get(url)
    return data
  } catch (error) {
    const { response } = error as unknown as AxiosError
    if (response) {
      throw { status: response.status, data: response.data }
    }
    throw error
  }
}
