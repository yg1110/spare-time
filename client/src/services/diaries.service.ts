import { AxiosError } from 'axios'
import { EventInput } from '@fullcalendar/core'
import AxiosService from '.'

const api = AxiosService.getApiBaseUrl()
export const getDiaries = async <T>(date: string): Promise<T> => {
  try {
    const res = await api.get(`dates/diaries?date=${date}`)
    return res.data
  } catch (error) {
    const { response } = error as unknown as AxiosError
    if (response) {
      throw { status: response.status, data: response.data }
    }
    throw error
  }
}

export const getDiariesRange = async <T>(
  startDate: string,
  endDate: string
): Promise<T> => {
  try {
    const res = await api.get(
      `dates/diaries?startDate=${startDate}&endDate=${endDate}`
    )
    return res.data
  } catch (error) {
    const { response } = error as unknown as AxiosError
    if (response) {
      throw { status: response.status, data: response.data }
    }
    throw error
  }
}

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

export const getDiaryById = async <T>(diaryId: string): Promise<T> => {
  try {
    const res = await api.get(`dates/diaries?diaryId=${diaryId}`)
    return res.data
  } catch (error) {
    const { response } = error as unknown as AxiosError
    if (response) {
      throw { status: response.status, data: response.data }
    }
    throw error
  }
}

export const updateDiaries = async <T>(
  diaryId: string,
  diaries: EventInput
): Promise<T> => {
  try {
    return await api.patch(`dates/diaries?diaryId=${diaryId}`, diaries)
  } catch (error) {
    const { response } = error as unknown as AxiosError
    if (response) {
      throw { status: response.status, data: response.data }
    }
    throw error
  }
}

export const deleteDiaries = async <T>(diaryId: string): Promise<T> => {
  try {
    return await api.delete(`dates/diaries?diaryId=${diaryId}`)
  } catch (error) {
    const { response } = error as unknown as AxiosError
    if (response) {
      throw { status: response.status, data: response.data }
    }
    throw error
  }
}
