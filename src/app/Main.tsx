import { Container, Grid } from '@mui/material'
import React from 'react'
import { createNewTodolistTC } from '@/features/todolists/model/todolists-slice'
import { TodoLists } from '@/features/todolists/ui/todolists/TodoLists/TodoLists'
import { AddForm } from '@/common/components'
import { useAppDispatch } from '@/common/hooks'

export const Main: React.FC = () => {
  const dispatch = useAppDispatch()
  const createNewTodoList = (title: string) => dispatch(createNewTodolistTC(title))
  return (
    <Container fixed maxWidth={'xl'}>
      <Grid container sx={{ mb: '15px' }}>
        <AddForm createNewItem={createNewTodoList} />
      </Grid>
      <Grid container sx={{ gap: '15px', justifyContent: 'space-between' }}>
        <TodoLists />
      </Grid>
    </Container>
  )
}
