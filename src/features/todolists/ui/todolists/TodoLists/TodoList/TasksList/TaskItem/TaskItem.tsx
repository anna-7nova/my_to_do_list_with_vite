import IconButton from '@mui/material/IconButton'
import DeleteIcon from '@mui/icons-material/Delete'
import Checkbox from '@mui/material/Checkbox'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import React, { ChangeEvent } from 'react'
import { EditableSpan } from '@/common/components'
import { TasksListType, UpdateTaskModel } from '@/features/todolists/api/tasksApi.types'
import { useChangeItemMutation, useDeleteTaskMutation } from '@/features/todolists/api/tasksApi'
import { TaskStatus } from '@/common/enums'
import { DomainTodolist } from '@/features/todolists/api/todolistsApi.types'
import { taskListStylesSx } from '../TasksList.styles'
import { useAppDispatch } from '@/common/hooks'
import { todolistsApi } from '@/features/todolists/api/todolistsApi'
import { RequestStatus } from '@/common/types'

type Props = {
  filteredTask: TasksListType[] | undefined
  todolist: DomainTodolist
}

export const TaskItems: React.FC<Props> = ({ filteredTask, todolist }: Props) => {
  const [deleteTaskMutation] = useDeleteTaskMutation()
  const [changeItemMutation] = useChangeItemMutation()

  const dispatch = useAppDispatch()

  const { id, entityStatus } = todolist

  const createModel = ({ changeItem, task }: { changeItem: Partial<UpdateTaskModel>; task: TasksListType }) => ({
    title: changeItem.title === undefined ? task.title : changeItem.title,
    description: task.description,
    status: changeItem.status === undefined ? task.status : changeItem.status,
    priority: task.priority,
    startDate: task.startDate,
    deadline: task.deadline,
  })

  const changeTaskTitle = (task: TasksListType, value: string) => {
    const model = createModel({ changeItem: { title: value }, task })
    changeItemMutation({ todoListId: task.todoListId, taskId: task.id, model })
  }

  const changeTodolistStatus = (entityStatus: RequestStatus) => {
    dispatch(
      todolistsApi.util.updateQueryData("getTodolists", undefined, (state) => {
        const index = state.findIndex((el) => el.id === id)
      if (index !== -1) state[index].entityStatus = entityStatus
      }),
    )
  }

  return (
    <List>
      {filteredTask?.map((t) => {
        const removeTaskHandler = () => {
          changeTodolistStatus('loading')
          deleteTaskMutation({ taskId: t.id, todoListId: id })
          .unwrap()
          .catch(()=>changeTodolistStatus('failed'))
        }
        const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
          const newStatus = e.currentTarget.checked ? TaskStatus.Completed : TaskStatus.New
          const model = createModel({ changeItem: { status: newStatus }, task: t })
          changeItemMutation({ todoListId: t.todoListId, taskId: t.id, model })
        }
        const addedDate = (date: string) => {
          const utcString = date.endsWith('Z') ? date : date + 'Z'
          return new Date(utcString).toLocaleString('ru-RU')
        }
        return (
          <ListItem key={t.id} sx={taskListStylesSx(t.status === TaskStatus.Completed)}>
            <div>
              <Checkbox
                checked={t.status === TaskStatus.Completed}
                onChange={changeTaskStatusHandler}
                disabled={entityStatus === 'loading'}
              />
              <EditableSpan
                title={t.title}
                onClick={(value: string) => changeTaskTitle(t, value)}
                disabled={entityStatus === 'loading'}
              />
              <span className="addedDate"> - {addedDate(t.addedDate)}</span>
            </div>
            <IconButton onClick={removeTaskHandler} aria-label="delete" disabled={entityStatus === 'loading'}>
              <DeleteIcon />
            </IconButton>
          </ListItem>
        )
      })}
    </List>
  )
}
