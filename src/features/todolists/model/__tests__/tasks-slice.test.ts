import { beforeEach, expect, test } from 'vitest'
import { createTaskTC, removeTaskTC, tasksReducer, updateTaskTC } from '../tasks-slice'
import { nanoid } from '@reduxjs/toolkit'
import { TaskPriority, TaskStatus } from '@/common/enums'
import { createNewTodolistTC, removeTodolistTC } from '../todolists-slice'
import { TasksListType } from '../../api/tasksApi.types'

let todolistId1: string
let todolistId2: string
let startState: Record<string, Array<TasksListType>> = {}
const taskDefaultValues = {
  description: null,
  order: 1,
  priority: 1,
  startDate: null,
  deadline: null,
  addedDate: '',
}

beforeEach(() => {
  todolistId1 = nanoid()
  todolistId2 = nanoid()

  startState = {
    [todolistId1]: [
      {
        id: nanoid(),
        title: 'HTML&CSS',
        status: TaskStatus.Completed,
        todoListId: todolistId1,
        ...taskDefaultValues,
      },
      {
        id: nanoid(),
        title: 'JS',
        status: TaskStatus.Completed,
        todoListId: todolistId1,
        ...taskDefaultValues,
      },
      {
        id: nanoid(),
        title: 'React',
        status: TaskStatus.New,
        todoListId: todolistId1,
        ...taskDefaultValues,
      },
    ],
    [todolistId2]: [
      {
        id: nanoid(),
        title: 'English',
        status: TaskStatus.Completed,
        todoListId: todolistId2,
        ...taskDefaultValues,
      },
      {
        id: nanoid(),
        title: 'CV',
        status: TaskStatus.Completed,
        todoListId: todolistId2,
        ...taskDefaultValues,
      },
      {
        id: nanoid(),
        title: 'Cover letter',
        status: TaskStatus.New,
        todoListId: todolistId2,
        ...taskDefaultValues,
      },
    ],
  }
})

test('correct list of task should be deleted 1 position', () => {
  const endState = tasksReducer(
    startState,
    removeTaskTC.fulfilled({ taskId: startState[todolistId2][1].id, todoListId: todolistId2 }, 'requestId', {
      taskId: startState[todolistId2][1].id,
      todoListId: todolistId2,
    }),
  )

  expect(endState[todolistId2].length).toBe(2)
  expect(endState[todolistId2][1].title).toBe('Cover letter')
})

test('correct list of task should add 1 task', () => {
  const endState = tasksReducer(
    startState,
    createTaskTC.fulfilled(
      {
        id: todolistId1,
        title: 'New task',
        description: '',
        todoListId: todolistId1,
        order: 1,
        status: TaskStatus.New,
        priority: TaskPriority.Low,
        startDate: '',
        deadline: '',
        addedDate: '',
      },
      'requestId',
      { title: 'New task', todoListId: todolistId1 },
    ),
  )

  expect(endState[todolistId1].length).toBe(4)
  expect(endState[todolistId1][0].title).toBe('New task')
})

test('correct list of task should change status of task', () => {
  const endState = tasksReducer(
    startState,
    updateTaskTC.fulfilled(
      (startState[todolistId1][0] = { ...startState[todolistId1][0], status: TaskStatus.New }),
      'requestId',
      { task: startState[todolistId1][0], changeItem: { status: TaskStatus.New } },
    ),
  )

  expect(endState[todolistId1].length).toBe(3)
  expect(endState[todolistId1][0].status).toBe(TaskStatus.New)
})

test('correct list of task should update the title', () => {
  const endState = tasksReducer(
    startState,
    updateTaskTC.fulfilled(
      (startState[todolistId1][2] = { ...startState[todolistId1][2], title: 'anna' }),
      'requestId',
      { task: startState[todolistId1][2], changeItem: { title: 'anna' } },
    ),
  )

  expect(endState[todolistId1].length).toBe(3)
  expect(endState[todolistId1][2].title).toBe('anna')
})

test('array should be created for new todolist', () => {
  const endState = tasksReducer(
    startState,
    createNewTodolistTC.fulfilled(
      { id: nanoid(), title: 'new todolist', addedDate: '', order: 0 },
      'requestId',
      'new todolist',
    ),
  )

  const keys = Object.keys(endState)
  const newKey = keys.find((k) => k !== todolistId1 && k !== todolistId2)
  if (!newKey) {
    throw Error('New key should be added')
  }

  expect(keys.length).toBe(3)
  expect(endState[newKey]).toEqual([])
})

test('property with todolistId should be deleted', () => {
  const endState = tasksReducer(
    startState,
    removeTodolistTC.fulfilled({ todoListId: todolistId2 }, 'requestId', { todoListId: todolistId2 }),
  )

  const keys = Object.keys(endState)

  expect(keys.length).toBe(1)
  expect(endState[todolistId2]).not.toBeDefined()
  // or
  expect(endState[todolistId2]).toBeUndefined()
})
