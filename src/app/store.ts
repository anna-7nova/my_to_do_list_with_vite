import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { appReducer } from './app-reducer'
import { tasksReducer } from '@/features/todolists/model/tasks-reducer'
import { todolistsReducer } from '@/features/todolists/model/todolists-reducer'

const rootReducer = combineReducers({
  tasks: tasksReducer,
  todolists: todolistsReducer,
  app: appReducer,
})

export const store = configureStore({
  reducer: rootReducer,
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

// для возможности обращения к store в консоли браузера
// @ts-ignore
window.store = store
