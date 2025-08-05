import { TodoList } from '../api/todolistsApi.types'
import { todolistsApi } from '../api/todolistsApi'
import { createAppSlice } from '@/common/utils/createAppSlice'
import { setAppStatusAC } from '@/app/app-slice'

export type DomainTodolist = TodoList & {
  filter: FilterValuesType
}

export type FilterValuesType = 'all' | 'active' | 'completed'

export const todolistsSlice = createAppSlice({
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
    getTodolistTC: create.asyncThunk(
      async (_, { rejectWithValue, dispatch }) => {
        try {
          dispatch(setAppStatusAC({ status: 'pending' }))
          await new Promise((resolve) => setTimeout(resolve, 2000))
          const res = await todolistsApi.getTodolists()
          dispatch(setAppStatusAC({ status: 'succeeded' }))
          return { todolists: res.data }
        } catch (e) {
          dispatch(setAppStatusAC({ status: 'failed' }))
          return rejectWithValue(e)
        } finally {
          dispatch(setAppStatusAC({ status: 'idle' }))
        }
      },
      {
        fulfilled: (_, action) => {
          const response = action.payload?.todolists
          return response?.map((el) => ({ ...el, filter: 'all' }))
        }
      }
    ),
    createNewTodolistTC: create.asyncThunk(
      async (title: string, { rejectWithValue, dispatch }) => {
        try {
          dispatch(setAppStatusAC({ status: 'pending' }))
          await new Promise((resolve) => setTimeout(resolve, 2000))
          const res = await todolistsApi.createTodolist(title)
          dispatch(setAppStatusAC({ status: 'succeeded' }))
          return res.data.data.item
        } catch (e) {
          dispatch(setAppStatusAC({ status: 'failed' }))
          return rejectWithValue(e)
        }
      },
      {
        fulfilled: (state, action) => {
          state.unshift({
            id: action.payload.id,
            title: action.payload.title,
            filter: 'all',
            addedDate: '',
            order: 0,
          })
        }
      }
    ),
    updateTitleTodolistTC: create.asyncThunk(
      async (args: { id: string; title: string }, { rejectWithValue, dispatch }) => {
        try {
          dispatch(setAppStatusAC({ status: 'pending' }))
          await new Promise((resolve) => setTimeout(resolve, 2000))
          await todolistsApi.changeTodolistTitle(args)
          dispatch(setAppStatusAC({ status: 'succeeded' }))
          return args
        } catch (e) {
          dispatch(setAppStatusAC({ status: 'failed' }))
          return rejectWithValue(e instanceof Error ? e.message : 'Update failed')
        }
      },
      {
        fulfilled: (state, action) => {
          const index = state.findIndex((todo) => todo.id === action.payload.id)
          if (index !== -1) {
            state[index].title = action.payload.title
          }
        }
      }
    ),
    removeTodolistTC: create.asyncThunk(
      async (arg: { todoListId: string }, { rejectWithValue, dispatch }) => {
        try {
          dispatch(setAppStatusAC({ status: 'pending' }))
          await new Promise((resolve) => setTimeout(resolve, 2000))
          await todolistsApi.deleteTodolist(arg.todoListId)
          dispatch(setAppStatusAC({ status: 'succeeded' }))
          return arg
        } catch (e) {
          dispatch(setAppStatusAC({ status: 'failed' }))
          return rejectWithValue(e)
        }
      },
      {
        fulfilled: (state, action) => {
          const index = state.findIndex((t) => t.id === action.payload.todoListId)
          if (index !== -1) state.splice(index, 1)
        }
      }
    )
  }),
  selectors: {
    selectTodolists: (state) => state,
  },
})

export const { updateFilterTodolistAC, getTodolistTC, createNewTodolistTC, updateTitleTodolistTC, removeTodolistTC } = todolistsSlice.actions

export const todolistsReducer = todolistsSlice.reducer

export const { selectTodolists } = todolistsSlice.selectors

