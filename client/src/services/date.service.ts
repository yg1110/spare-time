import { AxiosError } from 'axios'
import AxiosService from '.'

const api = AxiosService.getApiBaseUrl()
export const getDateRange = async <T>(
  startDate: string,
  endDate: string
): Promise<T> => {
  try {
    const res = await api.get(`dates?startDate=${startDate}&endDate=${endDate}`)
    return res.data
  } catch (error) {
    const { response } = error as unknown as AxiosError
    if (response) {
      throw { status: response.status, data: response.data }
    }
    throw error
  }
}
