import React from 'react'
import { TodoList } from './TodoList/TodoList'
import { useGetTodolistsQuery } from '@/features/todolists/api/todolistsApi'
import { TodolistSkeleton } from './TodolistSkeleton/TodolistSkeleton'
import Box from '@mui/material/Box'
import { containerSx } from '@/common/styles'

export const TodoLists: React.FC = () => {
  const { data: todolists, isLoading} = useGetTodolistsQuery()

  if (isLoading) {
    return (
      <Box sx={containerSx} style={{ gap: '32px' }}>
        {Array(3)
          .fill(null)
          .map((_, id) => (
            <TodolistSkeleton key={id} />
          ))}
      </Box>
    )
  }

  return (
    <>
      {todolists?.map((t) => (
        <TodoList key={t.id} todolist={t} />
      ))}
    </>
  )
}
