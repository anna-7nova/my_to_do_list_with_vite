import { instance } from '@/common/instance/instance'
import { TodoList } from './todolistsApi.types'
import { BaseResponseType } from '@/common/types'

export const todolistsApi = {
  getTodolists: () => instance.get<TodoList[]>('/todo-lists'),
  createTodolist: (title: string) =>
    instance.post<BaseResponseType<{ item: TodoList }>>('/todo-lists', {
      title,
    }),
  deleteTodolist: (id: string) => instance.delete<BaseResponseType>(`/todo-lists/${id}`),
  changeTodolistTitle: ({ id, title }: { id: string; title: string }) =>
    instance.put<BaseResponseType>(`/todo-lists/${id}`, { title }),
}
