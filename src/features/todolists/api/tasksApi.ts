import { instance } from '@/common/instance/instance'
import { ResponseTasks, TasksList, UpdateTaskModel } from './tasksApi.types'
import { BaseResponseType } from '@/common/types'

export const tasksApi = {
  getTasksList(id: string) {
    return instance.get<ResponseTasks>(`/todo-lists/${id}/tasks`)
  },
  createTask({todolistId, title}: {todolistId: string, title: string}) {
    return instance.post<BaseResponseType<{item: TasksList}>>(`/todo-lists/${todolistId}/tasks`, {title})
  },
  deleteTask({todolistId, taskId}:{todolistId: string, taskId: string}){
    return instance.delete<BaseResponseType>(`/todo-lists/${todolistId}/tasks/${taskId}`)
  },
  changeStatus({todoListId, taskId, model}:{todoListId: string, taskId: string, model: UpdateTaskModel}){
    return instance.put<BaseResponseType<{item: TasksList}>>(`/todo-lists/${todoListId}/tasks/${taskId}`, model)
  }
}
