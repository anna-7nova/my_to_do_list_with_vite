import React, { ChangeEvent, useEffect } from 'react'
import IconButton from '@mui/material/IconButton'
import DeleteIcon from '@mui/icons-material/Delete'
import Checkbox from '@mui/material/Checkbox'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import { taskListStylesSx } from './TasksList.styles'
import { DomainTodolist } from '@/features/todolists/model/todolists-slice'
import { getTasksTC, removeTaskTC, selectTasks, updateTaskTC } from '@/features/todolists/model/tasks-slice'
import { EditableSpan } from '@/common/components'
import { useAppDispatch, useAppSelector } from '@/common/hooks'
import { TaskStatus } from '@/common/enums'
import type { TasksListType } from '@/features/todolists/api/tasksApi.types'
import { de } from 'zod/v4/locales'

type Props = {
  todolist: DomainTodolist
}

export const TasksList: React.FC<Props> = ({ todolist }: Props) => {
  const { id, filter, entityStatus } = todolist

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

  const changeTaskTitle = (todolistTasks: TasksListType, value: string) =>
    dispatch(updateTaskTC({ task: todolistTasks, changeItem: { title: value } }))
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
              dispatch(updateTaskTC({ task: t, changeItem: { status: newStatus } }))
            }
             const addedDate = new Date(t.addedDate).toLocaleString()
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
                  <span className="addedDate"> - {addedDate}</span>
                </div>
                <IconButton onClick={removeTaskHandler} aria-label="delete" disabled={entityStatus === 'loading'}>
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
