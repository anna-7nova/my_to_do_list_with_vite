import { createAction, createReducer } from '@reduxjs/toolkit'

//actions
export const switchMoodAC = createAction<{ mood: MoodType }>('app/switchMood')

const initialState = {
  mood: 'light' as MoodType,
}
//reducer
export const appReducer = createReducer(initialState, (builder) => {
  builder.addCase(switchMoodAC, (state, action) => {
    state.mood = action.payload.mood
  })
})

export type MoodType = 'light' | 'dark'
