import { TaskPriority, TaskStatus } from "@/common/enums"

export type TasksList = {
  description: string
  title: string
  status: TaskStatus
  priority: TaskPriority
  startDate: string
  deadline: string
  id: string
  todoListId: string
  order: number
  addedDate: string
}

export type ResponseTasks = {
    items: TasksList[]
    totalCount: number
    error: string | null
}

export type UpdateTaskModel = {
title: string
description: string
status: TaskStatus
priority: TaskPriority
startDate: string
deadline: string
}
