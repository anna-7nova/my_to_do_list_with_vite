import { createSlice, nanoid } from '@reduxjs/toolkit'
import { TodoList } from '../api/todolistsApi.types'

export type DomainTodolist  = TodoList & {
  filter: FilterValuesType
} 

export type FilterValuesType = 'all' | 'active' | 'completed'

export const todolistsSlice = createSlice({
  name: 'todolists',
  initialState: [] as DomainTodolist[],
  reducers: (create) => ({
    updateFilterTodolistAC: create.reducer<{
      todolistId: string
      filter: FilterValuesType
    }>((state, action) => {
      const todolist = state.find((t) => t.id === action.payload.todolistId)
      if (todolist) {
        todolist.filter = action.payload.filter
      }
    }),
    updateTitleTodolistAC: create.reducer<{
      todolistId: string
      title: string
    }>((state, action) => {
      const index = state.findIndex((todo) => todo.id === action.payload.todolistId)
      if (index !== -1) {
        state[index].title = action.payload.title
      }
    }),
    removeTodolistAC: create.reducer<{ todolistId: string }>((state, action) => {
      const index = state.findIndex((t) => t.id === action.payload.todolistId)
      if (index !== -1) state.splice(index, 1)
    }),
    createNewTodolistAC: create.preparedReducer(
      (title: string) => ({ payload: { title, todolistId: nanoid() } }),
      (state, action) => {
        state.unshift({
          id: action.payload.todolistId,
          title: action.payload.title,
          filter: 'all',
          addedDate: '', 
          order: 0
        })
      },
    ),
    setTodolistsAC: create.reducer<{ todolists: TodoList[] }>((state, action) => {
      const response =  action.payload.todolists
      return response.map(el=> ({...el, filter: 'all'}))
    }),
  }),
  selectors: {
    selectTodolists: (state) => state,
  },
})

export const { removeTodolistAC, createNewTodolistAC, updateTitleTodolistAC, updateFilterTodolistAC, setTodolistsAC } =
  todolistsSlice.actions

export const todolistsReducer = todolistsSlice.reducer

export const { selectTodolists } = todolistsSlice.selectors
