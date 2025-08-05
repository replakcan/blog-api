import axios from 'axios'

const API_BASE_URL = import.meta.env.VITE_API_URL

export const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
})

axiosInstance.interceptors.request.use(config => {
  const token = JSON.parse(localStorage.getItem('token'))

  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }

  return config
})
