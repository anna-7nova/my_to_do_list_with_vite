import { Container, Grid } from '@mui/material'
import React from 'react'
import { TodoLists } from '@/features/todolists/ui/todolists/TodoLists/TodoLists'
import { AddForm } from '@/common/components'
import { useCreateTodolistMutation } from '@/features/todolists/api/todolistsApi'

export const Main: React.FC = () => {
  const [createTodolistMutation] = useCreateTodolistMutation()
  const createNewTodoList = (title: string) => createTodolistMutation(title)

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
