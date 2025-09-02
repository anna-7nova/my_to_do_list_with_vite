import * as z from 'zod'
import { ResultCode } from '../enums/enums'

export const FieldErrorSchema = z.object({
  error: z.string(),
  field: z.string(),
})

export type FieldError = z.infer<typeof FieldErrorSchema>

export const BaseResponseTypeSchema = <T extends z.ZodType>(schema: T) =>
  z.object({
    data: schema,
    fieldsErrors: FieldErrorSchema.array(),
    messages: z.string().array(),
    resultCode: z.enum(ResultCode),
  })

export const DefaultResponseTypeSchema = BaseResponseTypeSchema(z.object({}))

export type DefaultResponse = z.infer<typeof DefaultResponseTypeSchema>

export type RequestStatus = 'idle' | 'loading' | 'succeeded' | 'failed'

export type BaseResponseType<T> = {
  data: T
  fieldsErrors: FieldError[]
  messages: string[]
  resultCode: number
}
