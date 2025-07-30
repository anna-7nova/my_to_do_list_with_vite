import React, { ChangeEvent } from 'react'
import IconButton from '@mui/material/IconButton'
import DeleteIcon from '@mui/icons-material/Delete'
import Checkbox from '@mui/material/Checkbox'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import { taskListStylesSx } from './TasksList.styles'
import { DomainTodolist} from '@/features/todolists/model/todolists-slice'
import { changeStatusTaskAC, removeTaskAC, selectTasks, updateTitleTaskAC } from '@/features/todolists/model/tasks-slice'
import { EditableSpan } from '@/common/components'
import { useAppDispatch, useAppSelector } from '@/common/hooks'

type Props = {
  todolist: DomainTodolist
}

export const TasksList: React.FC<Props> = ({ todolist }: Props) => {
  const { id, filter } = todolist

  const tasks = useAppSelector(selectTasks)
  const dispatch = useAppDispatch()

  const todolistTasks = tasks[id]
  let filteredTask = todolistTasks
  if (filter === 'active') {
    filteredTask = todolistTasks.filter((item) => !item.isDone)
  }
  if (filter === 'completed') {
    filteredTask = todolistTasks.filter((item) => item.isDone)
  }

  const changeTaskTitle = (taskId: string, value: string) =>
    dispatch(updateTitleTaskAC({ todolistId: id, itemId: taskId, title: value }))
  return (
    <>
      {filteredTask?.length === 0 ? (
        <span>List is empty</span>
      ) : (
        <List>
          {filteredTask?.map((t) => {
            const removeTaskHandler = () => dispatch(removeTaskAC({ taskId: t.id, todolistId: id }))
            const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) =>
              dispatch(changeStatusTaskAC({ taskId: t.id, newStatus: e.currentTarget.checked, todolistId: id }))
            return (
              <ListItem key={t.id} sx={taskListStylesSx(t.isDone)}>
                <div>
                  <Checkbox checked={t.isDone} onChange={changeTaskStatusHandler} />
                  <EditableSpan title={t.title} onClick={(value: string) => changeTaskTitle(t.id, value)} />
                </div>
                <IconButton onClick={removeTaskHandler} aria-label="delete">
                  <DeleteIcon />
                </IconButton>
              </ListItem>
            )
          })}
        </List>
      )}
    </>
  )
}
