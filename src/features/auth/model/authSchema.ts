import * as z from 'zod'

export const LoginSchema = z.object({
  email: z.email('Невалидный email'),
  password: z.string().min(3, 'Минимальны пароль 3 символа'),
  rememberMe: z.boolean().optional(),
  captcha: z.string().optional(),
})

export type LoginInputs = z.infer<typeof LoginSchema>