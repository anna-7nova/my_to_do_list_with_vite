import { createSlice } from '@reduxjs/toolkit'

export const appSlice = createSlice({
  name: 'app',
  initialState: {
    mood: 'light' as MoodType,
  },
  reducers: (create) => {
    return {
      switchMoodAC: create.reducer<{ mood: MoodType }>((state, action) => {
        state.mood = action.payload.mood
      }),
    }
  },
  selectors: {
    selectTheme: state => state.mood
  }
})

export const appReducer = appSlice.reducer
export const { switchMoodAC } = appSlice.actions
export const {selectTheme}=appSlice.selectors

export type MoodType = 'light' | 'dark'
