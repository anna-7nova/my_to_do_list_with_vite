import { DomainTodolist, TodoList, TodolistCreateResponse } from './todolistsApi.types'
import { DefaultResponse } from '@/common/types'
import { baseApi } from '@/app/baseApi'

export const todolistsApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getTodolists: build.query<DomainTodolist[], void>({
      query: () => '/todo-lists',
      transformResponse: (todolists: TodoList[]): DomainTodolist[] =>
        todolists.map((el) => ({ ...el, filter: 'all', entityStatus: 'idle' })),
      providesTags: ['Todolist'],
    }),
    createTodolist: build.mutation<TodolistCreateResponse, string>({
      query: (title) => ({
        method: 'post',
        url: '/todo-lists',
        body: { title },
      }),
      invalidatesTags: ['Todolist'],
    }),
    deleteTodolist: build.mutation<DefaultResponse, string>({
      query: (id) => ({
        method: 'delete',
        url: `/todo-lists/${id}`,
        body: { id },
      }),
      invalidatesTags: ['Todolist'],
    }),
    changeTodolistTitle: build.mutation<DefaultResponse, { id: string; title: string }>({
      query: ({ id, title }) => ({
        method: 'put',
        url: `/todo-lists/${id}`,
        body: { title },
      }),
      invalidatesTags: ['Todolist'],
    }),
  }),
})

export const {
  useGetTodolistsQuery,
  useCreateTodolistMutation,
  useDeleteTodolistMutation,
  useChangeTodolistTitleMutation,
} = todolistsApi
