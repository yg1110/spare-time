import { AxiosError } from 'axios'
import { EventInput } from '@fullcalendar/core'
import AxiosService from '.'

const api = AxiosService.getApiBaseUrl()
export const createDiaries = async <T>(diaries: EventInput): Promise<T> => {
  try {
    return await api.post('dates/diaries', diaries)
  } catch (error) {
    const { response } = error as unknown as AxiosError
    if (response) {
      throw { status: response.status, data: response.data }
    }
    throw error
  }
}
