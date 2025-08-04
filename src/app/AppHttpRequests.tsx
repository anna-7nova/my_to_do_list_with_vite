import { type ChangeEvent, type CSSProperties, useEffect, useState } from 'react'
import Checkbox from '@mui/material/Checkbox'
import { AddForm, EditableSpan } from '@/common/components'
import { todolistsApi } from '@/features/todolists/api/todolistsApi'
import { TodoList } from '@/features/todolists/api/todolistsApi.types'
import { tasksApi } from '@/features/todolists/api/tasksApi'
import { TasksList, UpdateTaskModel } from '@/features/todolists/api/tasksApi.types'
import { TaskStatus } from '@/common/enums'

export const AppHttpRequests = () => {
  const [todolists, setTodolists] = useState<TodoList[]>([])
  const [tasks, setTasks] = useState<Record<string, TasksList[]>>({})

  useEffect(() => {
    // get todolists
    todolistsApi.getTodolists().then((res) => {
      const todoLists = res.data
      setTodolists(todoLists)
      // get tasksLists
      todoLists.forEach((todolist) => {
        tasksApi.getTasksList(todolist.id).then((res) => {
          setTasks((prev) => ({ ...prev, [todolist.id]: res.data.items }))
        })
      })
    })
  }, [])

  const createTodolist = (title: string) => {
    todolistsApi.createTodolist(title).then((res) => {
      setTodolists([res.data.data.item, ...todolists])
    })
  }

  const deleteTodolist = (id: string) => {
    todolistsApi.deleteTodolist(id).then(() => {
      setTodolists(todolists.filter((el) => el.id !== id))
    })
  }

  const changeTodolistTitle = (id: string, title: string) => {
    todolistsApi.changeTodolistTitle({ id, title }).then(() => {
      setTodolists(todolists.map((el) => (el.id === id ? { ...el, title } : el)))
    })
  }

  const createTask = (todolistId: string, title: string) => {
    tasksApi.createTask({ todolistId, title }).then((res) => {
      setTasks({ ...tasks, [todolistId]: [res.data.data.item, ...tasks[todolistId]] })
    })
  }

  const deleteTask = (todolistId: string, taskId: string) => {
    tasksApi.deleteTask({ todolistId, taskId }).then((res) => {
      console.log(res.data)
      setTasks({ ...tasks, [todolistId]: tasks[todolistId].filter((el) => el.id !== taskId) })
    })
  }

  const changeTaskStatus = (e: ChangeEvent<HTMLInputElement>, task: TasksList) => {
    const todoListId = task.todoListId
    const model: UpdateTaskModel = {
      title: task.title,
      description: task.description,
      status: e.currentTarget.checked ? TaskStatus.Completed : TaskStatus.New,
      priority: task.priority,
      startDate: task.startDate,
      deadline: task.deadline,
    }
    tasksApi.changeStatus({ todoListId, taskId: task.id, model }).then((res) => {
      setTasks({ ...tasks, [todoListId]: tasks[todoListId].map((el) => (el.id === task.id ? res.data.data.item : el)) })
    })
  }

  const changeTaskTitle = (task: TasksList, title: string) => {
    const todoListId = task.todoListId
    const model: UpdateTaskModel = {
      title: title,
      description: task.description,
      status: task.status,
      priority: task.priority,
      startDate: task.startDate,
      deadline: task.deadline,
    }
    tasksApi.changeStatus({ todoListId, taskId: task.id, model }).then((res) => {
      setTasks({ ...tasks, [todoListId]: tasks[todoListId].map((el) => (el.id === task.id ? res.data.data.item : el)) })
    })
  }

  return (
    <div style={{ margin: '20px' }}>
      <AddForm createNewItem={createTodolist} />
      {todolists.map((todolist: any) => (
        <div key={todolist.id} style={container}>
          <div>
            <EditableSpan title={todolist.title} onClick={(title) => changeTodolistTitle(todolist.id, title)} />
            <button onClick={() => deleteTodolist(todolist.id)}>x</button>
          </div>
          <AddForm createNewItem={(title) => createTask(todolist.id, title)} />
          {tasks[todolist.id]?.map((task) => (
            <div key={task.id}>
              <Checkbox checked={task.status === TaskStatus.Completed} onChange={(e) => changeTaskStatus(e, task)} />
              <EditableSpan title={task.title} onClick={(title) => changeTaskTitle(task, title)} />
              <button onClick={() => deleteTask(todolist.id, task.id)}>x</button>
            </div>
          ))}
        </div>
      ))}
    </div>
  )
}

const container: CSSProperties = {
  border: '1px solid black',
  margin: '20px 0',
  padding: '10px',
  width: '300px',
  display: 'flex',
  justifyContent: 'space-between',
  flexDirection: 'column',
}
