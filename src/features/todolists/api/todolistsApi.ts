import { instance } from '@/common/instance/instance'
import { TodoList, TodolistCreateResponse } from './todolistsApi.types'
import { DefaultResponse } from '@/common/types'

export const todolistsApi = {
  getTodolists: () => instance.get<TodoList[]>('/todo-lists'),
  createTodolist: (title: string) =>
    instance.post<TodolistCreateResponse>('/todo-lists', {
      title,
    }),
  deleteTodolist: (id: string) => instance.delete<DefaultResponse>(`/todo-lists/${id}`),
  changeTodolistTitle: ({ id, title }: { id: string; title: string }) =>
    instance.put<DefaultResponse>(`/todo-lists/${id}`, { title }),
}
