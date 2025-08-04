import React, { ChangeEvent, useEffect } from 'react'
import IconButton from '@mui/material/IconButton'
import DeleteIcon from '@mui/icons-material/Delete'
import Checkbox from '@mui/material/Checkbox'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import { taskListStylesSx } from './TasksList.styles'
import { DomainTodolist } from '@/features/todolists/model/todolists-slice'
import {
  changeStatusTaskTC,
  getTasksTC,
  removeTaskTC,
  selectTasks,
  updateTitleTaskTC,
} from '@/features/todolists/model/tasks-slice'
import { EditableSpan } from '@/common/components'
import { useAppDispatch, useAppSelector } from '@/common/hooks'
import { TaskStatus } from '@/common/enums'

type Props = {
  todolist: DomainTodolist
}

export const TasksList: React.FC<Props> = ({ todolist }: Props) => {
  const { id, filter } = todolist

  const tasks = useAppSelector(selectTasks)
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(getTasksTC(id))
  }, [])

  const todolistTasks = tasks[id]
  let filteredTask = todolistTasks
  if (filter === 'active') {
    filteredTask = todolistTasks.filter((item) => item.status === TaskStatus.New)
  }
  if (filter === 'completed') {
    filteredTask = todolistTasks.filter((item) => item.status === TaskStatus.Completed)
  }

  const changeTaskTitle = (taskId: string, value: string) =>
    dispatch(updateTitleTaskTC({ todoListId: id, taskId: taskId, changeItem: value }))
  return (
    <>
      {filteredTask?.length === 0 ? (
        <span>List is empty</span>
      ) : (
        <List>
          {filteredTask?.map((t) => {
            const removeTaskHandler = () => dispatch(removeTaskTC({ taskId: t.id, todoListId: id }))
            const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
              const newStatus = e.currentTarget.checked ? TaskStatus.Completed : TaskStatus.New
              dispatch(changeStatusTaskTC({ taskId: t.id, newStatus: newStatus, todoListId: id }))
            }
            return (
              <ListItem key={t.id} sx={taskListStylesSx(t.status === TaskStatus.Completed)}>
                <div>
                  <Checkbox checked={t.status === TaskStatus.Completed} onChange={changeTaskStatusHandler} />
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
