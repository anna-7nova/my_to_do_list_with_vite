import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Paper from '@mui/material/Paper'
import { FiltersButtons } from './FiltersButtons/FiltersButtons'
import { TasksList } from './TasksList/TasksList'
import { TodoComponentHeader } from './TodoComponentHeader/TodoComponentHeader'
import { cardStyle } from './TodoList.styles'
import { DomainTodolist, removeTodolistTC, updateTitleTodolistTC } from '@/features/todolists/model/todolists-slice'
import { createTaskTC } from '@/features/todolists/model/tasks-slice'
import { AddForm } from '@/common/components'
import { useAppDispatch } from '@/common/hooks'

type Props = {
  todolist: DomainTodolist
}

export const TodoList: React.FC<Props> = ({ todolist }: Props) => {
  const dispatch = useAppDispatch()

  //handlers
  const removeTodoListHandler = () => dispatch(removeTodolistTC({ todoListId: todolist.id }))
  const changeTodoListTitleHandler = (title: string) => dispatch(updateTitleTodolistTC({ id: todolist.id, title }))
  const addNewTaskHandler = (title: string) => dispatch(createTaskTC({ title, todoListId: todolist.id }))

  return (
    <div className="todoList">
      <Paper elevation={5}>
        <Card variant="outlined" sx={cardStyle}>
          <CardContent>
            <TodoComponentHeader
              title={todolist.title}
              onClick={removeTodoListHandler}
              onChange={changeTodoListTitleHandler}
            />
            <AddForm createNewItem={addNewTaskHandler} />
            <TasksList todolist={todolist} />
            <FiltersButtons todolist={todolist} />
          </CardContent>
        </Card>
      </Paper>
    </div>
  )
}
