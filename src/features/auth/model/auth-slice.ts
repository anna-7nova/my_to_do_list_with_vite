import { createAppSlice } from '@/common/utils/createAppSlice'
import { authApi } from '../api/authApi'
import { setAppStatusAC } from '@/app/app-slice'
import { handleServerError } from '@/common/utils/handleServerError/handleServerError'
import { LoginInputs } from './authSchema'
import { ResultCode } from '@/common/enums/enums'
import { handleServerAppError } from '@/common/utils/handleServerAppError/handleServerAppError'
import { AUTH_TOKEN } from '@/common/constants'

export const authSlice = createAppSlice({
  name: 'auth',
  initialState: { isLoggedIn: false },
  reducers: (create) => ({
    loginTC: create.asyncThunk(
      async (payload: LoginInputs, { dispatch, rejectWithValue }) => {
        try {
          dispatch(setAppStatusAC({ status: 'loading' }))
          const res = await authApi.login(payload)
          if (res.data.resultCode === ResultCode.Success) {
            dispatch(setAppStatusAC({ status: 'succeeded' }))
            localStorage.setItem(AUTH_TOKEN, res.data.data.token)
            return { isLoggedIn: true }
          } else {
            handleServerAppError(res.data, dispatch)
            return rejectWithValue(null)
          }
        } catch (error) {
          handleServerError(error, dispatch)
          return rejectWithValue(error)
        }
      },
      {
        fulfilled: (state, action) => {
          state.isLoggedIn = action.payload.isLoggedIn
        },
      },
    ),
    logoutTC: create.asyncThunk(
      async (_arg, { dispatch, rejectWithValue }) => {
        try {
          dispatch(setAppStatusAC({ status: 'loading' }))
          const res = await authApi.logout()
          if (res.data.resultCode === ResultCode.Success) {
            dispatch(setAppStatusAC({ status: 'succeeded' }))
            localStorage.removeItem(AUTH_TOKEN)
            return { isLoggedIn: false }
          } else {
            handleServerAppError(res.data, dispatch)
            return rejectWithValue(null)
          }
        } catch (error) {
          handleServerError(error, dispatch)
          return rejectWithValue(error)
        }
      },
      {
        fulfilled: (state, action) => {
          state.isLoggedIn = action.payload.isLoggedIn
        },
      },
    ),
    initializeAppTC: create.asyncThunk(
      async (_, { dispatch, rejectWithValue }) => {
        try {
          dispatch(setAppStatusAC({ status: 'loading' }))
          const res = await authApi.me()
          if (res.data.resultCode === ResultCode.Success) {
            dispatch(setAppStatusAC({ status: 'succeeded' }))
            return { isLoggedIn: true }
          } else {
            handleServerAppError(res.data, dispatch)
            return rejectWithValue(null)
          }
        } catch (error: any) {
          handleServerError(error, dispatch)
          return rejectWithValue(null)
        }
      },
      {
        fulfilled: (state, action) => {
          state.isLoggedIn = action.payload.isLoggedIn
        },
      }
    ),
  }),
  selectors: {
    selectIsLoggedIn: (state) => state.isLoggedIn,
  },
})

export const { loginTC , logoutTC, initializeAppTC} = authSlice.actions

export const authReducer = authSlice.reducer

export const { selectIsLoggedIn } = authSlice.selectors
