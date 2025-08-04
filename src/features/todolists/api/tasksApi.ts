import { instance } from '@/common/instance/instance'
import { ResponseTasks, TasksList, UpdateTaskModel } from './tasksApi.types'
import { BaseResponseType } from '@/common/types'

export const tasksApi = {
  getTasksList(id: string) {
    return instance.get<ResponseTasks>(`/todo-lists/${id}/tasks`)
  },
  createTask({ todoListId, title }: { todoListId: string; title: string }) {
    return instance.post<BaseResponseType<{ item: TasksList }>>(`/todo-lists/${todoListId}/tasks`, { title })
  },
  deleteTask({ todoListId, taskId }: { todoListId: string; taskId: string }) {
    return instance.delete<BaseResponseType>(`/todo-lists/${todoListId}/tasks/${taskId}`)
  },
  changeItem({ todoListId, taskId, model }: { todoListId: string; taskId: string; model: UpdateTaskModel }) {
    return instance.put<BaseResponseType<{ item: TasksList }>>(`/todo-lists/${todoListId}/tasks/${taskId}`, model)
  },
}
