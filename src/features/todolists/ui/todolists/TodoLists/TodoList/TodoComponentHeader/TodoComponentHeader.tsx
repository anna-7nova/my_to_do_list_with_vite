import Grid from '@mui/material/Grid'
import IconButton from '@mui/material/IconButton'
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined'
import { gridContaiter } from './TodoComponentHeader.styles'
import { EditableSpan } from '@/common/components'
import { useChangeTodolistTitleMutation, useDeleteTodolistMutation } from '@/features/todolists/api/todolistsApi'

type Props = {
  title: string
  id: string
  disabled?: boolean
}

export const TodoComponentHeader: React.FC<Props> = (todolist: Props) => {
  const { id, title, disabled } = todolist
  const [changeTodolistTitleMutation] = useChangeTodolistTitleMutation()
  const [deleteTodolistMutation] = useDeleteTodolistMutation()
  //handlers
  const removeTodoListHandler = () => deleteTodolistMutation(id)
  const changeTodoListTitleHandler = (newTitle: string) => changeTodolistTitleMutation({ id, title: newTitle })
  return (
    <div className={'container'}>
      <Grid container sx={gridContaiter}>
        <h3>
          <EditableSpan title={title} onClick={changeTodoListTitleHandler} disabled={disabled} />
        </h3>
        <IconButton disabled={disabled} onClick={removeTodoListHandler} aria-label="delete">
          <DeleteOutlinedIcon />
        </IconButton>
      </Grid>
    </div>
  )
}
