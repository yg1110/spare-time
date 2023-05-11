import { AxiosError } from 'axios'
import { EventInput } from '@fullcalendar/core'
import AxiosService from '.'

const api = AxiosService.getApiBaseUrl()
export const getSchedules = async <T>(date: string): Promise<T> => {
  try {
    const res = await api.get(`dates/schedules?date=${date}`)
    return res.data
  } catch (error) {
    const { response } = error as unknown as AxiosError
    if (response) {
      throw { status: response.status, data: response.data }
    }
    throw error
  }
}

export const getScheduleById = async <T>(scheduleId: string): Promise<T> => {
  try {
    const res = await api.get(`dates/schedules?scheduleId=${scheduleId}`)
    return res.data
  } catch (error) {
    const { response } = error as unknown as AxiosError
    if (response) {
      throw { status: response.status, data: response.data }
    }
    throw error
  }
}

export const getSchedulesRange = async <T>(
  startDate: string,
  endDate: string
): Promise<T> => {
  try {
    const res = await api.get(
      `dates/schedules?startDate=${startDate}&endDate=${endDate}`
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

export const createSchedules = async <T>(schedules: EventInput): Promise<T> => {
  try {
    return await api.post('dates/schedules', schedules)
  } catch (error) {
    const { response } = error as unknown as AxiosError
    if (response) {
      throw { status: response.status, data: response.data }
    }
    throw error
  }
}

export const updateSchedules = async <T>(
  scheduleId: string,
  schedules: EventInput
): Promise<T> => {
  try {
    return await api.patch(
      `dates/schedules?scheduleId=${scheduleId}`,
      schedules
    )
  } catch (error) {
    const { response } = error as unknown as AxiosError
    if (response) {
      throw { status: response.status, data: response.data }
    }
    throw error
  }
}

export const deleteSchedules = async <T>(scheduleId: string): Promise<T> => {
  try {
    return await api.delete(`dates/schedules?scheduleId=${scheduleId}`)
  } catch (error) {
    const { response } = error as unknown as AxiosError
    if (response) {
      throw { status: response.status, data: response.data }
    }
    throw error
  }
}
