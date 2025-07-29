import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Paper from '@mui/material/Paper'
import { FiltersButtons } from './FiltersButtons/FiltersButtons'
import { TasksList } from './TasksList/TasksList'
import { TodoComponentHeader } from './TodoComponentHeader/TodoComponentHeader'
import { cardStyle } from './TodoList.styles'
import { TodolistType, removeTodolistAC, updateTitleTodolistAC } from '@/features/todolists/model/todolists-reducer'
import { createTaskAC } from '@/features/todolists/model/tasks-reducer'
import { AddForm } from '@/common/components'
import { useAppDispatch } from '@/common/hooks'

type Props = {
  todolist: TodolistType
}

export const TodoList: React.FC<Props> = ({ todolist }: Props) => {
  const dispatch = useAppDispatch()

  //handlers
  const removeTodoListHandler = () => dispatch(removeTodolistAC({ todolistId: todolist.id }))
  const changeTodoListTitleHandler = (title: string) =>
    dispatch(updateTitleTodolistAC({ todolistId: todolist.id, title }))
  const addNewTaskHandler = (title: string) => dispatch(createTaskAC({ title, itemId: todolist.id }))

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
