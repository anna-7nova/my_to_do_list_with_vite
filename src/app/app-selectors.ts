import type { MoodType } from './app-reducer'
import type { RootState } from './store'

export const selectTheme = (state: RootState): MoodType => state.app.mood
