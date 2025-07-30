import React, { useEffect } from 'react'
import { TodoList } from './TodoList/TodoList'
import { useAppDispatch, useAppSelector } from '@/common/hooks'
import { selectTodolists, setTodolistsAC } from '@/features/todolists/model/todolists-slice'
import { todolistsApi } from '@/features/todolists/api/todolistsApi'

export const TodoLists: React.FC = () => {
  const todolists = useAppSelector(selectTodolists)
  const dispatch = useAppDispatch()
  useEffect(() => {
    todolistsApi.getTodolists().then((res) => {
      console.log(res.data)
      dispatch(setTodolistsAC({todolists: res.data}))
    })
  }, [])

  return (
    <>
      {todolists?.map((t) => (
        <TodoList key={t.id} todolist={t} />
      ))}
    </>
  )
}
