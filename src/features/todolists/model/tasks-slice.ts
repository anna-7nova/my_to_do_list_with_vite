import { TaskPriority, TaskStatus } from '@/common/enums'
import { tasksApi } from '../api/tasksApi'
import { createNewTodolistTC, removeTodolistTC } from './todolists-slice'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { UpdateTaskModel } from '../api/tasksApi.types'
import { RootState } from '@/app/store'

export type TaskType = {
  id: string
  title: string
  description: string | null
  todoListId: string
  order: number
  status: TaskStatus
  priority: TaskPriority
  startDate: string | null
  deadline: string | null
  addedDate: string
}

export type TasksType = {
  [todolistId: string]: Array<TaskType>
}

export const tasksSlice = createSlice({
  name: 'tasks',
  initialState: {} as TasksType,
  reducers: (create) => ({
    //пока все в extraReducers
  }),
  extraReducers: (builder) => {
    builder
      .addCase(getTasksTC.fulfilled, (state, action) => {
        state[action.payload.todolistId] = action.payload.tasks
      })
      .addCase(getTasksTC.rejected, (state, action: {}) => {
        // обработка ошибки при запросе getTasks
      })
      .addCase(createTaskTC.fulfilled, (state, action) => {
        state[action.payload.todoListId].unshift(action.payload)
      })
      .addCase(createTaskTC.rejected, (state, action: {}) => {
        // обработка ошибки при создании newTask
      })
      .addCase(removeTaskTC.fulfilled, (state, action) => {
        const index = state[action.payload.todoListId].findIndex((t) => t.id === action.payload.taskId)
        if (index !== -1) state[action.payload.todoListId].splice(index, 1)
      })
      .addCase(removeTaskTC.rejected, (state, action: {}) => {
        // обработка ошибки при удалении task
      })
      .addCase(updateTitleTaskTC.fulfilled, (state, action) => {
        const task = state[action.payload.todoListId].find((t) => t.id === action.payload.taskId)
        if (task) {
          task.title = action.payload.changeItem
        }
      })
      .addCase(updateTitleTaskTC.rejected, (state, action: {}) => {
        // обработка ошибки при изменении названия task
      })
      .addCase(changeStatusTaskTC.fulfilled, (state, action) => {
        const task = state[action.payload.todoListId].find((t) => t.id === action.payload.taskId)
        if (task) {
          task.status = action.payload.newStatus
        }
      })
      .addCase(changeStatusTaskTC.rejected, (state, action: {}) => {
        // обработка ошибки при изменении статуса task
      })
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

export const getTasksTC = createAsyncThunk(`${tasksSlice.name}/getTasksTC`, async (id: string, { rejectWithValue }) => {
  try {
    const res = await tasksApi.getTasksList(id)
    return { tasks: res.data.items, todolistId: id }
  } catch (e) {
    return rejectWithValue(e)
  }
})

export const createTaskTC = createAsyncThunk(
  `${tasksSlice.name}/createTaskTC`,
  async (args: { todoListId: string; title: string }, { rejectWithValue }) => {
    try {
      const res = await tasksApi.createTask(args)
      return res.data.data.item
    } catch (e) {
      return rejectWithValue(e)
    }
  },
)

export const removeTaskTC = createAsyncThunk(
  `${tasksSlice.name}/removeTaskTC`,
  async (args: { todoListId: string; taskId: string }, { rejectWithValue }) => {
    try {
      await tasksApi.deleteTask(args)
      return args
    } catch (e) {
      return rejectWithValue(e)
    }
  },
)

export const updateTitleTaskTC = createAsyncThunk(
  `${tasksSlice.name}/updateTitleTaskTC`,
  async (args: { todoListId: string; taskId: string; changeItem: string }, { rejectWithValue, getState }) => {
    const state = getState() as RootState
    const tasks = state.tasks[args.todoListId]
    const updatedTask = tasks.find((el) => el.id === args.taskId)

    if (!updatedTask) return rejectWithValue(null) //чтобы при updatedTask===underfined выбрасывало ошибку

    const model: UpdateTaskModel = {
      title: args.changeItem,
      description: updatedTask.description,
      status: updatedTask.status,
      priority: updatedTask.priority,
      startDate: updatedTask.startDate,
      deadline: updatedTask.deadline,
    }
    try {
      await tasksApi.changeItem({ todoListId: args.todoListId, taskId: args.taskId, model: model })
      return args
    } catch (e) {
      return rejectWithValue(e)
    }
  },
)

export const changeStatusTaskTC = createAsyncThunk(
  `${tasksSlice.name}/changeStatusTaskTC`,
  async (args: { taskId: string; newStatus: TaskStatus; todoListId: string }, { rejectWithValue, getState }) => {
    const state = getState() as RootState
    const tasks = state.tasks[args.todoListId]
    const updatedTask = tasks.find((el) => el.id === args.taskId)

    if (!updatedTask) return rejectWithValue(null) //чтобы при updatedTask===underfined выбрасывало ошибку

    const model: UpdateTaskModel = {
      title: updatedTask.title,
      description: updatedTask.description,
      status: args.newStatus ? TaskStatus.Completed : TaskStatus.New,
      priority: updatedTask.priority,
      startDate: updatedTask.startDate,
      deadline: updatedTask.deadline,
    }
    try {
      await tasksApi.changeItem({ todoListId: args.todoListId, taskId: args.taskId, model: model })
      return args
    } catch (e) {
      return rejectWithValue(e)
    }
  },
)

export const tasksReducer = tasksSlice.reducer

export const { selectTasks } = tasksSlice.selectors
