import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { TodoList } from '../api/todolistsApi.types'
import { todolistsApi } from '../api/todolistsApi'

export type DomainTodolist = TodoList & {
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
  }),
  selectors: {
    selectTodolists: (state) => state,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getTodolistTC.fulfilled, (_, action) => {
        const response = action.payload?.todolists
        return response?.map((el) => ({ ...el, filter: 'all' }))
      })
      .addCase(getTodolistTC.rejected, (state, action: {}) => {
        // обработка ошибки при запросе за тудулистами
      })
      .addCase(createNewTodolistTC.fulfilled, (state, action) => {
        state.unshift({
          id: action.payload.id,
          title: action.payload.title,
          filter: 'all',
          addedDate: '',
          order: 0,
        })
      })
      .addCase(createNewTodolistTC.rejected, (state, action: {}) => {
        // обработка ошибки при создании todolist
      })
      .addCase(updateTitleTodolistTC.fulfilled, (state, action) => {
        const index = state.findIndex((todo) => todo.id === action.payload.id)
        if (index !== -1) {
          state[index].title = action.payload.title
        }
      })
      .addCase(updateTitleTodolistTC.rejected, (state, action: {}) => {
        // обработка ошибки при запросе обновления title todolist
      })
      .addCase(removeTodolistTC.fulfilled, (state, action) => {
        const index = state.findIndex((t) => t.id === action.payload.todoListId)
        if (index !== -1) state.splice(index, 1)
      })
      .addCase(removeTodolistTC.rejected, (state, action: {}) => {
        // обработка ошибки при запросе удаления todolist
      })
  },
})

export const getTodolistTC = createAsyncThunk(`${todolistsSlice.name}/getTodolistTC`, async (_, thunkAPI) => {
  const { rejectWithValue } = thunkAPI
  try {
    const res = await todolistsApi.getTodolists()
    return { todolists: res.data }
  } catch (e) {
    return rejectWithValue(e)
  }
})

export const createNewTodolistTC = createAsyncThunk(
  `${todolistsSlice.name}/createNewTodolistTC`,
  async (title: string, { rejectWithValue }) => {
    try {
      const res = await todolistsApi.createTodolist(title)
      return res.data.data.item
    } catch (e) {
      return rejectWithValue(e)
    }
  },
)

export const updateTitleTodolistTC = createAsyncThunk(
  `${todolistsSlice.name}/updateTitleTodolistTC`,
  async (args: { id: string; title: string }, { rejectWithValue }) => {
    try {
      await todolistsApi.changeTodolistTitle(args)
      return args
    } catch (e) {
      return rejectWithValue(e instanceof Error ? e.message : 'Update failed')
    }
  },
)

export const removeTodolistTC = createAsyncThunk(
  `${todolistsSlice.name}/removeTodolistTC`,
  async (arg: { todoListId: string }, { rejectWithValue }) => {
    try {
      await todolistsApi.deleteTodolist(arg.todoListId)
      return arg
    } catch (e) {
      return rejectWithValue(e)
    }
  },
)

export const { updateFilterTodolistAC } = todolistsSlice.actions

export const todolistsReducer = todolistsSlice.reducer

export const { selectTodolists } = todolistsSlice.selectors
