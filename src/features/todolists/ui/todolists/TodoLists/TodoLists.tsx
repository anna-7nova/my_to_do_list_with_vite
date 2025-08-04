import React, { useEffect } from 'react'
import { TodoList } from './TodoList/TodoList'
import { useAppDispatch, useAppSelector } from '@/common/hooks'
import { getTodolistTC, selectTodolists } from '@/features/todolists/model/todolists-slice'

export const TodoLists: React.FC = () => {
  const todolists = useAppSelector(selectTodolists)
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(getTodolistTC())
  }, [])

  return (
    <>
      {todolists?.map((t) => (
        <TodoList key={t.id} todolist={t} />
      ))}
    </>
  )
}
