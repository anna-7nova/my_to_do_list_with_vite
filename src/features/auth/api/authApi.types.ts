import { BaseResponseTypeSchema } from '@/common/types'
import * as z from 'zod'

export const AuthSchema = BaseResponseTypeSchema(
  z.object({
    token: z.string(),
    userId: z.number(),
  }),
)
export type AuthType = z.infer<typeof AuthSchema>

export const AuthMeSchema = BaseResponseTypeSchema(
  z.object({
    id: z.number(),
    email: z.string(),
    login: z.string(),
  }),
)

export type AuthMeType = z.infer<typeof AuthMeSchema>

export const LoginSchema = z.object({
  email: z.email('Невалидный email'),
  password: z.string().min(3, 'Минимальны пароль 3 символа'),
  rememberMe: z.boolean().optional(),
  captcha: z.string().optional(),
})

export type LoginInputs = z.infer<typeof LoginSchema>
