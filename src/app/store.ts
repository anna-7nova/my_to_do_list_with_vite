import { configureStore } from '@reduxjs/toolkit'
import { appReducer, appSlice } from './app-slice'
import { setupListeners } from '@reduxjs/toolkit/query'
import { baseApi } from './baseApi'

export const store = configureStore({
  reducer: {
    [appSlice.name]: appReducer,
    [baseApi.reducerPath]: baseApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(baseApi.middleware),
})

setupListeners(store.dispatch)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
