import React, { useState } from 'react'
import { useGetTasksListQuery } from '@/features/todolists/api/tasksApi'
import { TaskItems } from './TaskItem/TaskItem'
import { DomainTodolist } from '@/features/todolists/api/todolistsApi.types'
import { TaskStatus } from '@/common/enums'
import { TasksSkeleton } from './TasksSkeleton/TasksSkeleton'
import { TasksPagination } from './TasksPagination/TasksPagination'
import { PAGE_SIZE } from '@/common/constants'

type Props = {
  todolist: DomainTodolist
}

export const TasksList: React.FC<Props> = ({ todolist }: Props) => {
  const { id, filter } = todolist

  const [page, setPage] = useState(1)

  const { data: todolistTasks, isLoading } = useGetTasksListQuery({ id, params: { page } }, { refetchOnReconnect: true })

  let filteredTask = todolistTasks?.items
  if (filter === 'active') {
    filteredTask = filteredTask?.filter((item) => item.status === TaskStatus.New)
  }
  if (filter === 'completed') {
    filteredTask = filteredTask?.filter((item) => item.status === TaskStatus.Completed)
  }

  if (isLoading) return <TasksSkeleton />

  return (
    <>
      {filteredTask?.length === 0 ? (
        <span>List is empty</span>
      ) : (
        <TaskItems filteredTask={filteredTask} todolist={todolist} />
      )}
      {todolistTasks && todolistTasks?.totalCount > PAGE_SIZE && (
        <TasksPagination totalCount={todolistTasks?.totalCount || 0} page={page} setPage={setPage} />
      )}
    </>
  )
}
