import { RequestStatus } from '@/common/types'
import { createSlice } from '@reduxjs/toolkit'

export const appSlice = createSlice({
  name: 'app',
  initialState: {
    mood: 'light' as MoodType,
    status: 'idle' as RequestStatus,
    error: null as string | null,
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
  }),
  selectors: {
    selectTheme: (state) => state.mood,
    selectStatus: (state) => state.status,
    selectError: (state) => state.error,
  },
})

export const appReducer = appSlice.reducer
export const { switchMoodAC, setAppStatusAC, setAppErrorAC } = appSlice.actions
export const { selectTheme, selectStatus, selectError } = appSlice.selectors

export type MoodType = 'light' | 'dark'
