import { TodoList, TodolistCreateResponseSchema, TodoListSchema } from '../api/todolistsApi.types'
import { todolistsApi } from '../api/todolistsApi'
import { createAppSlice } from '@/common/utils/createAppSlice'
import { setAppStatusAC } from '@/app/app-slice'
import { DefaultResponseTypeSchema, RequestStatus } from '@/common/types'
import { ResultCode } from '@/common/enums/enums'
import { handleServerError } from '@/common/utils/handleServerError/handleServerError'
import { handleServerAppError } from '@/common/utils/handleServerAppError/handleServerAppError'
import { clearDataAC } from '@/common/actions'

export type DomainTodolist = TodoList & {
  filter: FilterValuesType
  entityStatus: RequestStatus
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
    setEntityStatusAC: create.reducer<{ todolistId: string; entityStatus: RequestStatus }>((state, action) => {
      const index = state.findIndex((el) => el.id === action.payload.todolistId)
      if (index !== -1) state[index].entityStatus = action.payload.entityStatus
    }),
    getTodolistTC: create.asyncThunk(
      async (_, { rejectWithValue, dispatch }) => {
        try {
          dispatch(setAppStatusAC({ status: 'loading' }))
          const res = await todolistsApi.getTodolists()
          TodoListSchema.array().parse(res.data) //zod validation
          dispatch(setAppStatusAC({ status: 'succeeded' }))
          return { todolists: res.data }
        } catch (error) {
          handleServerError(error, dispatch)
          return rejectWithValue(error)
        }
      },
      {
        fulfilled: (_, action) => {
          const response = action.payload?.todolists
          return response?.map((el) => ({ ...el, filter: 'all', entityStatus: 'idle' }))
        },
      },
    ),
    createNewTodolistTC: create.asyncThunk(
      async (title: string, { rejectWithValue, dispatch }) => {
        try {
          dispatch(setAppStatusAC({ status: 'loading' }))
          const res = await todolistsApi.createTodolist(title)
          TodolistCreateResponseSchema.parse(res.data) //zod validation
          if (res.data.resultCode === ResultCode.Success) {
            dispatch(setAppStatusAC({ status: 'succeeded' }))
            return res.data.data.item
          } else {
            handleServerAppError(res.data, dispatch)
            return rejectWithValue(null)
          }
        } catch (error) {
          handleServerError(error, dispatch)
          return rejectWithValue(error)
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
            entityStatus: 'idle',
          })
        },
      },
    ),
    updateTitleTodolistTC: create.asyncThunk(
      async (args: { id: string; title: string }, { rejectWithValue, dispatch }) => {
        try {
          dispatch(setAppStatusAC({ status: 'loading' }))
          const res = await todolistsApi.changeTodolistTitle(args)
          DefaultResponseTypeSchema.parse(res.data) //zod
          if (res.data.resultCode === ResultCode.Success) {
            dispatch(setAppStatusAC({ status: 'succeeded' }))
            return args
          } else {
            handleServerAppError(res.data, dispatch)
            return rejectWithValue(null)
          }
        } catch (error) {
          handleServerError(error, dispatch)
          return rejectWithValue(error)
        }
      },
      {
        fulfilled: (state, action) => {
          const index = state.findIndex((todo) => todo.id === action.payload.id)
          if (index !== -1) {
            state[index].title = action.payload.title
          }
        },
      },
    ),
    removeTodolistTC: create.asyncThunk(
      async (arg: { todoListId: string }, { rejectWithValue, dispatch }) => {
        try {
          dispatch(setAppStatusAC({ status: 'loading' }))
          dispatch(setEntityStatusAC({ todolistId: arg.todoListId, entityStatus: 'loading' }))
          const res = await todolistsApi.deleteTodolist(arg.todoListId)
          DefaultResponseTypeSchema.parse(res.data) //zod
          if (res.data.resultCode === ResultCode.Success) {
            dispatch(setAppStatusAC({ status: 'succeeded' }))
            return arg
          } else {
            handleServerAppError(res.data, dispatch)
            return rejectWithValue(null)
          }
        } catch (error) {
          handleServerError(error, dispatch)
          dispatch(setEntityStatusAC({ todolistId: arg.todoListId, entityStatus: 'failed' }))
          return rejectWithValue(error)
        }
      },
      {
        fulfilled: (state, action) => {
          const index = state.findIndex((t) => t.id === action.payload.todoListId)
          if (index !== -1) state.splice(index, 1)
        },
      },
    ),
  }),
  extraReducers: (builder) => {
    builder.addCase(clearDataAC, () => {
      return []
    })
  },
  selectors: {
    selectTodolists: (state) => state,
  },
})

export const {
  updateFilterTodolistAC,
  setEntityStatusAC,
  getTodolistTC,
  createNewTodolistTC,
  updateTitleTodolistTC,
  removeTodolistTC,
} = todolistsSlice.actions

export const todolistsReducer = todolistsSlice.reducer

export const { selectTodolists } = todolistsSlice.selectors
