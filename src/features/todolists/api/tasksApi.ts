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
    getTasksList: builder.query<ResponseTasks, { id: string; params: { page: number } }>({
      query: ({ id, params }) => ({
        method: 'get',
        url: `/todo-lists/${id}/tasks`,
        params: { ...params, count: PAGE_SIZE },
      }),
      extraOptions: { dataSchema: ResponseTasksSchema },
      providesTags: (_res, _error, { id }) => [{ type: 'Task', id }],
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
        onQueryStarted: async ({ todoListId, taskId, model }, { dispatch, queryFulfilled, getState }) => {
          const args = tasksApi.util.selectCachedArgsForQuery(getState(), 'getTasksList')
          const patchResults: any[] = []

          args.forEach((arg) => {
            patchResults.push(
              dispatch(
                tasksApi.util.updateQueryData(
                  'getTasksList',
                  { id: todoListId, params: { page: arg.params.page } },
                  (state) => {
                    const index = state.items.findIndex((el) => el.id === taskId)
                    if (index !== -1) state.items[index] = { ...state.items[index], ...model }
                  },
                ),
              ),
            )
          })
          try {
            await queryFulfilled
          } catch (err) {
            patchResults.forEach((patchResult) => {
              patchResult.undo()
            })
          }
        },
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
