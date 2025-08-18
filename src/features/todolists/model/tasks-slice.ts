import { tasksApi } from '../api/tasksApi'
import { createNewTodolistTC, removeTodolistTC } from './todolists-slice'
import { TasksListType, UpdateTaskModel } from '../api/tasksApi.types'
import { createAppSlice } from '@/common/utils/createAppSlice'
import { setAppStatusAC } from '@/app/app-slice'

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
          const res = await tasksApi.getTasksList(id)
          dispatch(setAppStatusAC({ status: 'succeeded' }))
          return { tasks: res.data.items, todolistId: id }
        } catch (e) {
          dispatch(setAppStatusAC({ status: 'failed' }))
          return rejectWithValue(e)
        }
      },
      {
        fulfilled: (state, action) => {
          state[action.payload.todolistId] = action.payload.tasks
        }
      }
    ),
    createTaskTC: create.asyncThunk(
      async (args: { todoListId: string; title: string }, { rejectWithValue, dispatch }) => {
        try {
          dispatch(setAppStatusAC({ status: 'loading' }))
          const res = await tasksApi.createTask(args)
          dispatch(setAppStatusAC({ status: 'succeeded' }))
          return res.data.data.item
        } catch (e) {
          dispatch(setAppStatusAC({ status: 'failed' }))
          return rejectWithValue(e)
        }
      },
      {
        fulfilled: (state, action) => {
          state[action.payload.todoListId].unshift(action.payload)
        }
      }
    ),
    removeTaskTC: create.asyncThunk(
      async (args: { todoListId: string; taskId: string }, { rejectWithValue, dispatch }) => {
        try {
          dispatch(setAppStatusAC({ status: 'loading' }))
          await tasksApi.deleteTask(args)
          dispatch(setAppStatusAC({ status: 'succeeded' }))
          return args
        } catch (e) {
          dispatch(setAppStatusAC({ status: 'failed' }))
          return rejectWithValue(e)
        }
      },
      {
        fulfilled: (state, action) => {
          const index = state[action.payload.todoListId].findIndex((t) => t.id === action.payload.taskId)
          if (index !== -1) state[action.payload.todoListId].splice(index, 1)
        }
      }
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
          const res = await tasksApi.changeItem({ todoListId: task.todoListId, taskId: task.id, model: model })
          dispatch(setAppStatusAC({ status: 'succeeded' }))
          return res.data.data.item
        } catch (e) {
          dispatch(setAppStatusAC({ status: 'failed' }))
          return rejectWithValue(e)
        }
      },
      {
        fulfilled: (state, action) => {
          const taskIndex = state[action.payload.todoListId].findIndex((t) => t.id === action.payload.id)
          if (taskIndex !== -1) {
            state[action.payload.todoListId][taskIndex] = action.payload
          }
        }
      }
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
  },
  selectors: {
    selectTasks: (state) => state,
  },
})

export const { getTasksTC, createTaskTC, removeTaskTC, updateTaskTC } = tasksSlice.actions

export const tasksReducer = tasksSlice.reducer

export const { selectTasks } = tasksSlice.selectors
