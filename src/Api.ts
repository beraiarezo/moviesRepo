import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, Method } from 'axios'

class ApiClass {
  baseUrl?: string;
  axiosInstance?: AxiosInstance;

  setBaseUrl(baseUrl: string) {
    this.baseUrl = baseUrl
    this.axiosInstance = undefined
  }

  request<T>(method: Method, endpoint: string, params?: any) : Promise<AxiosResponse<T>> {
    if (!this.axiosInstance) {
      this.axiosInstance = axios.create({
        baseURL: `${this.baseUrl}`,
      })
    }
    const config : AxiosRequestConfig = {
      method: method,
      url: endpoint,
      headers: {
        'Authorization': 'bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjNjhiNjBiNTM1NDljMzNiMGRmM2ViZjFkODMxYWQzMSIsInN1YiI6IjYxN2RiMjlmY2JhMzZmMDA0M2U0ZjdhOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.jD1picuUfx1dbxDv0OkQG1UqnYqN2k3rfDbjgnBFRZM'
      },
    }
    if (method === 'POST') {
      config.data = params
    } else {
      config.params = params
    }
    return this.axiosInstance.request(config)
  }
}

export let API = new ApiClass()