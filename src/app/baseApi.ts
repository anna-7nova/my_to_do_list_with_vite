import { AUTH_TOKEN } from '@/common/constants'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { handleError} from '@/common/utils'

export const baseApi = createApi({
  reducerPath: 'baseApi',
  tagTypes: ['Todolist', 'Task'],
  baseQuery: async (args, api, extraOptions) => {
    const result = await fetchBaseQuery({
      baseUrl: import.meta.env.VITE_BASE_URL,
      headers: {
        'API-KEY': import.meta.env.VITE_API_KEY,
      },
      prepareHeaders: (headers) => {
        headers.set('Authorization', `Bearer ${localStorage.getItem(AUTH_TOKEN)}`)
        return headers
      },
    })(args, api, extraOptions)

    handleError(api, result)

    return result
  },
  endpoints: () => ({}),
})
