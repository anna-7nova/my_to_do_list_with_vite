import { RootState } from '@/app/store'
import { TasksType } from './tasks-reducer'

export const selectTasks = (state: RootState): TasksType => state.tasks
