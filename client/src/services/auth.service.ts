import { AxiosError } from 'axios'
import AxiosService from '.'
import { Auth } from '@/types/Auth'

const api = AxiosService.getApiBaseUrl()
export const login = async <T>(auth: Auth): Promise<T> => {
  try {
    const res = await api.post(`auth/login`, auth)
    return res.data
  } catch (error) {
    const { response } = error as unknown as AxiosError
    if (response) {
      throw { status: response.status, data: response.data }
    }
    throw error
  }
}

export const signup = async <T>(auth: Auth): Promise<T> => {
  try {
    const res = await api.post(`auth/signup`, auth)
    return res.data
  } catch (error) {
    const { response } = error as unknown as AxiosError
    if (response) {
      throw { status: response.status, data: response.data }
    }
    throw error
  }
}

export const password = async <T>(auth: Auth): Promise<T> => {
  try {
    const {
      data: { data },
    } = await api.post(`auth/password`, auth)
    return data
  } catch (error) {
    const { response } = error as unknown as AxiosError
    if (response) {
      throw { status: response.status, data: response.data }
    }
    throw error
  }
}
