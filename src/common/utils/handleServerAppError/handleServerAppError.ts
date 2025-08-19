import { setAppErrorAC, setAppStatusAC } from '@/app/app-slice'
import { BaseResponseType } from '@/common/types'
import { Dispatch } from '@reduxjs/toolkit'

export const handleServerAppError = <T>(data: BaseResponseType<T>, dispatch: Dispatch) => {
  const setError = data.messages.length ? data.messages[0] : 'Error'
  dispatch(setAppErrorAC({ error: setError }))
  dispatch(setAppStatusAC({ status: 'failed' }))
}
