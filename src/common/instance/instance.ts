import axios from 'axios'

const token = import.meta.env.VITE_AUTH_TOKEN
const apiKey = import.meta.env.VITE_API_KEY

export const instance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  headers: {
    Authorization: `Bearer ${token}`,
    'API-KEY': apiKey,
  },
})
