import axios, { AxiosError } from 'axios'
import { REACT_APP_API_SERVER_URL } from '../config'
import { TIME } from '../models/Calendar'

export const postTime = async <T>(time: TIME): Promise<T> => {
  const url = REACT_APP_API_SERVER_URL + '/api/time'
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
