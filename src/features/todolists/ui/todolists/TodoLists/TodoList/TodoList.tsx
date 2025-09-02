import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Paper from '@mui/material/Paper'
import { FiltersButtons } from './FiltersButtons/FiltersButtons'
import { TasksList } from './TasksList/TasksList'
import { TodoComponentHeader } from './TodoComponentHeader/TodoComponentHeader'
import { cardStyle } from './TodoList.styles'
import { AddForm } from '@/common/components'
import { DomainTodolist } from '@/features/todolists/api/todolistsApi.types'
import { useCreateTaskMutation } from '@/features/todolists/api/tasksApi'

type Props = {
  todolist: DomainTodolist
}

export const TodoList: React.FC<Props> = ({ todolist }: Props) => {
  const [createTaskMutation] = useCreateTaskMutation()

  const addNewTaskHandler = (title: string) => createTaskMutation({ title, todoListId: todolist.id })

  return (
    <div className="todoList">
      <Paper elevation={5}>
        <Card variant="outlined" sx={cardStyle}>
          <CardContent>
            <TodoComponentHeader
              title={todolist.title}
              id={todolist.id}
              disabled={todolist.entityStatus === 'loading'}
            />
            <AddForm createNewItem={addNewTaskHandler} disabled={todolist.entityStatus === 'loading'} />
            <TasksList todolist={todolist} />
            <FiltersButtons todolist={todolist} />
          </CardContent>
        </Card>
      </Paper>
    </div>
  )
}
