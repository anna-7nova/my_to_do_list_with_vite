import { setAppErrorAC, setAppStatusAC } from '@/app/app-slice'
import { Dispatch } from '@reduxjs/toolkit'
import axios from 'axios'
import * as z from 'zod'

export const handleServerError = (error: unknown, dispatch: Dispatch) => {
  let errorMessage

  switch (true) {
    case axios.isAxiosError(error):
      errorMessage = error.response?.data?.message || error.message
      break

    case error instanceof z.ZodError:
      console.table(error.issues)
      errorMessage = 'Zod error. Смотри консоль'
      break

    case error instanceof Error:
      errorMessage = `Native error: ${error.message}`
      break

    default:
      errorMessage = JSON.stringify(error)
  }

  dispatch(setAppStatusAC({ status: 'failed' }))
  dispatch(setAppErrorAC({ error: errorMessage }))
}
