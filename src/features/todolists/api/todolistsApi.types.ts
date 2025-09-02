import { BaseResponseTypeSchema, RequestStatus } from '@/common/types'
import * as z from 'zod'

export const TodoListSchema = z.object({
  id: z.string(),
  title: z.string(),
  addedDate: z.iso.datetime({ local: true }),
  order: z.int(),
})

export type TodoList = z.infer<typeof TodoListSchema>

//create todolist
export const TodolistCreateResponseSchema = BaseResponseTypeSchema(
  z.object({
    item: TodoListSchema,
  }),
)

export type TodolistCreateResponse = z.infer<typeof TodolistCreateResponseSchema>

export type DomainTodolist = TodoList & {
  filter: FilterValuesType
  entityStatus: RequestStatus
}

export type FilterValuesType = 'all' | 'active' | 'completed'
