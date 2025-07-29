import React from 'react'
import { TodoList } from './TodoList/TodoList'
import { selectTodolists } from '@/features/todolists/model/todolists-selectors'
import { useAppSelector } from '@/common/hooks'

export const TodoLists: React.FC = () => {
  const todolists = useAppSelector(selectTodolists)
  return (
    <>
      {todolists?.map((t) => (
        <TodoList key={t.id} todolist={t} />
      ))}
    </>
  )
}
