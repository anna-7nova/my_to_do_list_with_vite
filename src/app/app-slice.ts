import { RequestStatus } from '@/common/types'
import { createSlice } from '@reduxjs/toolkit'

export const appSlice = createSlice({
  name: 'app',
  initialState: {
    mood: 'light' as MoodType,
    status: 'idle' as RequestStatus,
    error: null as string | null,
    isLoggedIn: false
  },
  reducers: (create) => ({
    switchMoodAC: create.reducer<{ mood: MoodType }>((state, action) => {
      state.mood = action.payload.mood
    }),
    setAppStatusAC: create.reducer<{ status: RequestStatus }>((state, action) => {
      state.status = action.payload.status
    }),
    setAppErrorAC: create.reducer<{ error: string | null }>((state, action) => {
      state.error = action.payload.error
    }),
    setIsLoggedInAC: create.reducer<{ isLoggedIn: boolean }>((state, action) => {
      state.isLoggedIn = action.payload.isLoggedIn
    }),
  }),
  selectors: {
    selectTheme: (state) => state.mood,
    selectStatus: (state) => state.status,
    selectError: (state) => state.error,
    selectIsLoggedIn: (state) => state.isLoggedIn,
  },
})

export const appReducer = appSlice.reducer
export const { switchMoodAC, setAppStatusAC, setAppErrorAC, setIsLoggedInAC } = appSlice.actions
export const { selectTheme, selectStatus, selectError, selectIsLoggedIn } = appSlice.selectors

export type MoodType = 'light' | 'dark'
