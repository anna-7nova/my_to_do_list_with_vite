import { TaskPriority, TaskStatus } from '@/common/enums'
import { BaseResponseTypeSchema } from '@/common/types'
import * as z from 'zod'

export const TaskListSchema = z.object({
  description: z.string().nullable(),
  title: z.string(),
  status: z.enum(TaskStatus),
  priority: z.enum(TaskPriority),
  startDate: z.string().nullable(),
  deadline: z.string().nullable(),
  id: z.string(),
  todoListId: z.string(),
  order: z.int(),
  addedDate: z.iso.datetime({ local: true }),
})

export type TasksListType = z.infer<typeof TaskListSchema>

export const ResponseTasksSchema = z.object({
  items: TaskListSchema.array(),
  totalCount: z.number().nonnegative(),
  error: z.string().nullable(),
})

export type ResponseTasks = z.infer<typeof ResponseTasksSchema>

//create and update taskType
export const TaskOperationResponseSchema = BaseResponseTypeSchema(
  z.object({
    item: TaskListSchema,
  }),
)

export type TaskOperationResponse = z.infer<typeof TaskOperationResponseSchema>

export type UpdateTaskModel = {
  title: string
  description: string | null
  status: TaskStatus
  priority: TaskPriority
  startDate: string | null
  deadline: string | null
}
