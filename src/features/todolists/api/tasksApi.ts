import { instance } from '@/common/instance/instance'
import {
  ResponseTasks,
  ResponseTasksSchema,
  TaskOperationResponse,
  TaskOperationResponseSchema,
  UpdateTaskModel,
} from './tasksApi.types'
import { DefaultResponse, DefaultResponseTypeSchema } from '@/common/types'
import { baseApi } from '@/app/baseApi'
import { PAGE_SIZE } from '@/common/constants'

export const tasksApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getTasksList: builder.query<ResponseTasks, {id:string, params: {page:number}}>({
      query: ({id, params}) => ({
        method: 'get',
        url: `/todo-lists/${id}/tasks`,
        params: {...params, count: PAGE_SIZE}
      }),
      extraOptions: { dataSchema: ResponseTasksSchema },
      providesTags: (_res, _error, {id}) => [{ type: 'Task', id }],
      keepUnusedDataFor: 120,
    }),
    createTask: builder.mutation<TaskOperationResponse, { todoListId: string; title: string }>({
      query: ({ todoListId, title }) => ({
        method: 'post',
        url: `/todo-lists/${todoListId}/tasks`,
        body: { title },
      }),
      extraOptions: { dataSchema: TaskOperationResponseSchema },
      invalidatesTags: (_res, _error, args) => [{ type: 'Task', id: args.todoListId }],
    }),
    deleteTask: builder.mutation<DefaultResponse, { todoListId: string; taskId: string }>({
      query: ({ todoListId, taskId }) => ({
        method: 'delete',
        url: `/todo-lists/${todoListId}/tasks/${taskId}`,
      }),
      extraOptions: { dataSchema: DefaultResponseTypeSchema },
      invalidatesTags: (_res, _error, args) => [{ type: 'Task', id: args.todoListId }],
    }),
    changeItem: builder.mutation<TaskOperationResponse, { todoListId: string; taskId: string; model: UpdateTaskModel }>(
      {
        query: ({ todoListId, taskId, model }) => ({
          method: 'put',
          url: `/todo-lists/${todoListId}/tasks/${taskId}`,
          body: model,
        }),
        extraOptions: { dataSchema: TaskOperationResponseSchema },
        invalidatesTags: (_res, _error, args) => [{ type: 'Task', id: args.todoListId }],
      },
    ),
  }),
})

export const { useGetTasksListQuery, useCreateTaskMutation, useDeleteTaskMutation, useChangeItemMutation } = tasksApi

export const _tasksApi = {
  getTasksList(id: string) {
    return instance.get<ResponseTasks>(`/todo-lists/${id}/tasks`)
  },
  createTask({ todoListId, title }: { todoListId: string; title: string }) {
    return instance.post<TaskOperationResponse>(`/todo-lists/${todoListId}/tasks`, { title })
  },
  deleteTask({ todoListId, taskId }: { todoListId: string; taskId: string }) {
    return instance.delete<DefaultResponse>(`/todo-lists/${todoListId}/tasks/${taskId}`)
  },
  changeItem({ todoListId, taskId, model }: { todoListId: string; taskId: string; model: UpdateTaskModel }) {
    return instance.put<TaskOperationResponse>(`/todo-lists/${todoListId}/tasks/${taskId}`, model)
  },
}
