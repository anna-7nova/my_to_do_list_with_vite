import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { tasksReducer } from "../model/tasks-reducer";
import { todolistsReducer } from "../model/todolists-reducer";

const rootReducer = combineReducers({
  tasks: tasksReducer,
  todolists: todolistsReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// для возможности обращения к store в консоли браузера
// @ts-ignore
window.store = store;
