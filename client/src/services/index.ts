import axios, { AxiosInstance } from 'axios'
import { NEXT_APP_API_SERVER_URL } from '@/config'

class AxiosService {
  private readonly api: AxiosInstance

  constructor() {
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'
    const baseURL = NEXT_APP_API_SERVER_URL || 'http://localhost:8000/api/v1'
    this.api = axios.create({
      baseURL: baseURL,
    })
  }

  getApiBaseUrl(): AxiosInstance {
    return this.api
  }
}

export default new AxiosService()
