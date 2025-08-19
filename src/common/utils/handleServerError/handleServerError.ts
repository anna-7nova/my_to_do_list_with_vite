import { setAppErrorAC, setAppStatusAC } from '@/app/app-slice'
import { Dispatch } from '@reduxjs/toolkit'
import { isAxiosError } from 'axios'

export const handleServerError = (error: unknown, dispatch: Dispatch) => {
  let errorMessage
  if (isAxiosError(error)) {
    errorMessage = error.response?.data?.message || error.message
  } else if (error instanceof Error) {
    errorMessage = `Native error: ${error.message}`
  } else {
    errorMessage = JSON.stringify(error)
  }
  dispatch(setAppStatusAC({ status: 'failed' }))
  dispatch(setAppErrorAC({ error: errorMessage }))
}
