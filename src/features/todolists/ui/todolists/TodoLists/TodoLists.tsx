import React from 'react'
import { TodoList } from './TodoList/TodoList'

import { useGetTodolistsQuery } from '@/features/todolists/api/todolistsApi'

export const TodoLists: React.FC = () => {
  const { data: todolists } = useGetTodolistsQuery()

  return (
    <>
      {todolists?.map((t) => (
        <TodoList key={t.id} todolist={t} />
      ))}
    </>
  )
}
