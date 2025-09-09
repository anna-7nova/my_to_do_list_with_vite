import React from 'react'
import { useGetTasksListQuery } from '@/features/todolists/api/tasksApi'
import { TaskItems } from './TaskItem/TaskItem'
import { DomainTodolist } from '@/features/todolists/api/todolistsApi.types'
import { TaskStatus } from '@/common/enums'
import { TasksSkeleton } from './TasksSkeleton/TasksSkeleton'

type Props = {
  todolist: DomainTodolist
}

export const TasksList: React.FC<Props> = ({ todolist }: Props) => {
  const { id, filter } = todolist

  const { data: todolistTasks, isLoading } = useGetTasksListQuery(id)

  let filteredTask = todolistTasks?.items
  if (filter === 'active') {
    filteredTask = filteredTask?.filter((item) => item.status === TaskStatus.New)
  }
  if (filter === 'completed') {
    filteredTask = filteredTask?.filter((item) => item.status === TaskStatus.Completed)
  }

  if(isLoading) return (<TasksSkeleton/>)

  return (
    <>
      {filteredTask?.length === 0 ? (
        <span>List is empty</span>
      ) : (
        <TaskItems filteredTask={filteredTask} todolist={todolist} />
      )}
    </>
  )
}
