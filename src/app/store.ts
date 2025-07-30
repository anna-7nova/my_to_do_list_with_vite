import { configureStore } from '@reduxjs/toolkit'
import { appReducer, appSlice } from './app-slice'
import { tasksReducer, tasksSlice } from '@/features/todolists/model/tasks-slice'
import { todolistsReducer, todolistsSlice } from '@/features/todolists/model/todolists-slice'

export const store = configureStore({
  reducer: {
    [tasksSlice.name]: tasksReducer,
    [todolistsSlice.name]: todolistsReducer,
    [appSlice.name]: appReducer,
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

