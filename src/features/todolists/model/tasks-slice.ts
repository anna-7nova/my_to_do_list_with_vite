import { tasksApi } from '../api/tasksApi'
import { createNewTodolistTC, removeTodolistTC } from './todolists-slice'
import { ResponseTasksSchema, TaskOperationResponseSchema, TasksListType, UpdateTaskModel } from '../api/tasksApi.types'
import { createAppSlice } from '@/common/utils/createAppSlice'
import { setAppStatusAC } from '@/app/app-slice'
import { ResultCode } from '@/common/enums/enums'
import { handleServerAppError } from '@/common/utils/handleServerAppError/handleServerAppError'
import { handleServerError } from '@/common/utils/handleServerError/handleServerError'
import { DefaultResponseTypeSchema } from '@/common/types'
import { clearDataAC } from '@/common/actions'

export type TasksType = {
  [todolistId: string]: Array<TasksListType>
}

export const tasksSlice = createAppSlice({
  name: 'tasks',
  initialState: {} as TasksType,
  reducers: (create) => ({
    getTasksTC: create.asyncThunk(
      async (id: string, { rejectWithValue, dispatch }) => {
        try {
          dispatch(setAppStatusAC({ status: 'loading' }))
          const res = await _tasksApi.getTasksList(id)
          ResponseTasksSchema.parse(res.data) //zod validation
          dispatch(setAppStatusAC({ status: 'succeeded' }))
          return { tasks: res.data.items, todolistId: id }
        } catch (error) {
          handleServerError(error, dispatch)
          return rejectWithValue(error)
        }
      },
      {
        fulfilled: (state, action) => {
          state[action.payload.todolistId] = action.payload.tasks
        },
      },
    ),
    createTaskTC: create.asyncThunk(
      async (args: { todoListId: string; title: string }, { rejectWithValue, dispatch }) => {
        try {
          dispatch(setAppStatusAC({ status: 'loading' }))
          const res = await _tasksApi.createTask(args)
          TaskOperationResponseSchema.parse(res.data) //zod
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
          state[action.payload.todoListId].unshift(action.payload)
        },
      },
    ),
    removeTaskTC: create.asyncThunk(
      async (args: { todoListId: string; taskId: string }, { rejectWithValue, dispatch }) => {
        try {
          dispatch(setAppStatusAC({ status: 'loading' }))
          const res = await _tasksApi.deleteTask(args)
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
          const index = state[action.payload.todoListId].findIndex((t) => t.id === action.payload.taskId)
          if (index !== -1) state[action.payload.todoListId].splice(index, 1)
        },
      },
    ),
    updateTaskTC: create.asyncThunk(
      async (args: { task: TasksListType; changeItem: Partial<UpdateTaskModel> }, { rejectWithValue, dispatch }) => {
        const { task, changeItem } = args

        const model: UpdateTaskModel = {
          title: changeItem.title === undefined ? task.title : changeItem.title,
          description: task.description,
          status: changeItem.status === undefined ? task.status : changeItem.status,
          priority: task.priority,
          startDate: task.startDate,
          deadline: task.deadline,
        }
        try {
          dispatch(setAppStatusAC({ status: 'loading' }))
          const res = await _tasksApi.changeItem({ todoListId: task.todoListId, taskId: task.id, model: model })
          TaskOperationResponseSchema.parse(res.data) //zod
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
          const taskIndex = state[action.payload.todoListId].findIndex((t) => t.id === action.payload.id)
          if (taskIndex !== -1) {
            state[action.payload.todoListId][taskIndex] = action.payload
          }
        },
      },
    ),
  }),
  extraReducers: (builder) => {
    builder
      .addCase(createNewTodolistTC.fulfilled, (state, action) => {
        state[action.payload.id] = []
      })
      .addCase(removeTodolistTC.fulfilled, (state, action) => {
        delete state[action.payload.todoListId]
      })
      .addCase(clearDataAC, () => {
        return {}
      })
  },
  selectors: {
    selectTasks: (state) => state,
  },
})

export const { getTasksTC, createTaskTC, removeTaskTC, updateTaskTC } = tasksSlice.actions

export const tasksReducer = tasksSlice.reducer

export const { selectTasks } = tasksSlice.selectors
