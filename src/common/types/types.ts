export type FieldError = {
  error: string
  field: string
}

export type BaseResponseType<T = {}> = {
  data: T
  fieldsErrors: FieldError[]
  messages: string[]
  resultCode: number
}

export type RequestStatus = ' dispatch(setAppStatusAC({status:'failed'}))' | 'pending' | 'succeeded' | 'failed'