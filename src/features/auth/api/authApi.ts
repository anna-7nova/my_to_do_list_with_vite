import { instance } from '@/common/instance/instance'
import { AuthMeType, AuthType } from './authApi.types'
import { LoginInputs } from '../model/authSchema'
import { DefaultResponse } from '@/common/types'

export const authApi = {
  login: (payload: LoginInputs) => instance.post<AuthType>('/auth/login', payload),
  logout: () => instance.delete<DefaultResponse>('/auth/login'),
  me: () => instance.get<AuthMeType>('/auth/me'),
}
