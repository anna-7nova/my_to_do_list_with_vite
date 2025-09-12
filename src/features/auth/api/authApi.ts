import { AuthMeType, AuthType, LoginInputs } from './authApi.types'
import { DefaultResponse } from '@/common/types'
import { baseApi } from '@/app/baseApi'

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    me: builder.query<AuthMeType, void>({
      query: () => ({
        method: 'get',
        url: '/auth/me',
      }),
    }),
    login: builder.mutation<AuthType, LoginInputs>({
      query: (payload) => ({
        method: 'post',
        url: '/auth/login',
        body: payload,
      }),
    }),
    logout: builder.mutation<DefaultResponse, void>({
      query: () => ({
        method: 'delete',
        url: '/auth/login',
      }),
    }),
  }),
})

export const { useMeQuery, useLoginMutation, useLogoutMutation } = authApi
