import axios from 'axios'
import { AUTH_TOKEN } from '../constants'

const apiKey = import.meta.env.VITE_API_KEY

export const instance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  headers: {
    'API-KEY': apiKey,
  },
})

instance.interceptors.request.use(function (config) {
  config.headers['Authorization'] = `Bearer ${localStorage.getItem(AUTH_TOKEN)}`
  return config
})
