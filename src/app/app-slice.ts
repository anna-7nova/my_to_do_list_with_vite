import { RequestStatus } from '@/common/types'
import { createSlice } from '@reduxjs/toolkit'

export const appSlice = createSlice({
  name: 'app',
  initialState: {
    mood: 'light' as MoodType,
    status: 'idle' as RequestStatus
  },
  reducers: (create) => ({
    switchMoodAC: create.reducer<{ mood: MoodType }>((state, action) => {
      state.mood = action.payload.mood
    }),
    setAppStatusAC: create.reducer<{ status: RequestStatus }>((state, action) => {
      state.status = action.payload.status
    })
  }),
  selectors: {
    selectTheme: (state) => state.mood,
    selectStatus: (state)=> state.status
  },
})

export const appReducer = appSlice.reducer
export const { switchMoodAC, setAppStatusAC } = appSlice.actions
export const { selectTheme, selectStatus } = appSlice.selectors

export type MoodType = 'light' | 'dark'

