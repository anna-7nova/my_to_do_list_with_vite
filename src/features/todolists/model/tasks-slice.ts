import { createNewTodolistAC, removeTodolistAC } from './todolists-slice'
import { createSlice, nanoid } from '@reduxjs/toolkit'

export type TaskType = {
  id: string
  title: string
  isDone: boolean
}

export type TasksType = {
  [todolistId: string]: Array<TaskType>
}

export const tasksSlice = createSlice({
  name: 'tasks',
  initialState: {} as TasksType,
  reducers: (create) => ({
    removeTaskAC: create.reducer<{
      taskId: string
      todolistId: string
    }>((state, action) => {
      const index = state[action.payload.todolistId].findIndex((t) => t.id === action.payload.taskId)
      if (index !== -1) state[action.payload.todolistId].splice(index, 1)
    }),
    createTaskAC: create.reducer<{ title: string; itemId: string }>((state, action) => {
      state[action.payload.itemId].unshift({
        id: nanoid(),
        title: action.payload.title,
        isDone: false,
      })
    }),
    changeStatusTaskAC: create.reducer<{
      taskId: string
      newStatus: boolean
      todolistId: string
    }>((state, action) => {
      const task = state[action.payload.todolistId].find((t) => t.id === action.payload.taskId)
      if (task) {
        task.isDone = action.payload.newStatus
      }
    }),
    updateTitleTaskAC: create.reducer<{
      todolistId: string
      itemId: string
      title: string
    }>((state, action) => {
      const task = state[action.payload.todolistId].find((t) => t.id === action.payload.itemId)
      if (task) {
        task.title = action.payload.title
      }
    }),
  }),
  extraReducers: (builder) => {
    builder
      .addCase(removeTodolistAC, (state, action) => {
        delete state[action.payload.todolistId]
      })
      .addCase(createNewTodolistAC, (state, action) => {
        state[action.payload.todolistId] = []
      })
  },
  selectors: {
    selectTasks: (state) => state,
  },
})

export const { createTaskAC, removeTaskAC, updateTitleTaskAC, changeStatusTaskAC } = tasksSlice.actions

export const tasksReducer = tasksSlice.reducer

export const { selectTasks } = tasksSlice.selectors
