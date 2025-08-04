import { beforeEach, expect, test } from 'vitest'
import {
  TasksType,
  changeStatusTaskTC,
  createTaskTC,
  removeTaskTC,
  tasksReducer,
  updateTitleTaskTC,
} from '../tasks-slice'
import { createNewTodolistAC, removeTodolistAC } from '../todolists-slice'
import { nanoid } from '@reduxjs/toolkit'
import { TaskPriority, TaskStatus } from '@/common/enums'

let todolistId1: string
let todolistId2: string
let startState: TasksType = {}

beforeEach(() => {
  todolistId1 = nanoid()
  todolistId2 = nanoid()

  startState = {
    [todolistId1]: [
      {
        id: nanoid(),
        title: 'HTML&CSS',
        status: TaskStatus.Completed,
        description: null,
        todoListId: nanoid(),
        order: 1,
        priority: 1,
        startDate: null,
        deadline: null,
        addedDate: '',
      },
      {
        id: nanoid(),
        title: 'JS',
        status: TaskStatus.Completed,
        description: null,
        todoListId: nanoid(),
        order: 1,
        priority: 1,
        startDate: null,
        deadline: null,
        addedDate: '',
      },
      {
        id: nanoid(),
        title: 'React',
        status: TaskStatus.New,
        description: null,
        todoListId: nanoid(),
        order: 1,
        priority: 1,
        startDate: null,
        deadline: null,
        addedDate: '',
      },
    ],
    [todolistId2]: [
      {
        id: nanoid(),
        title: 'English',
        status: TaskStatus.Completed,
        description: null,
        todoListId: nanoid(),
        order: 1,
        priority: 1,
        startDate: null,
        deadline: null,
        addedDate: '',
      },
      {
        id: nanoid(),
        title: 'CV',
        status: TaskStatus.Completed,
        description: null,
        todoListId: nanoid(),
        order: 1,
        priority: 1,
        startDate: null,
        deadline: null,
        addedDate: '',
      },
      {
        id: nanoid(),
        title: 'Cover letter',
        status: TaskStatus.New,
        description: null,
        todoListId: nanoid(),
        order: 1,
        priority: 1,
        startDate: null,
        deadline: null,
        addedDate: '',
      },
    ],
  }
})

test('correct list of task should be deleted 1 position', () => {
  const endState = tasksReducer(
    startState,
    removeTaskTC.fulfilled({ taskId: startState[todolistId2][1].id, todoListId: todolistId2 }, '', {
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
      '',
      { title: 'New task', todoListId: todolistId1 },
    ),
  )

  expect(endState[todolistId1].length).toBe(4)
  expect(endState[todolistId1][0].title).toBe('New task')
})

test('correct list of task should change status of task', () => {
  const endState = tasksReducer(
    startState,
    changeStatusTaskTC.fulfilled(
      { taskId: startState[todolistId1][0].id, newStatus: TaskStatus.Completed, todolistId: todolistId1 },
      '',
      { taskId: startState[todolistId1][0].id, newStatus: TaskStatus.Completed, todolistId: todolistId1 },
    ),
  )

  expect(endState[todolistId1].length).toBe(3)
  expect(endState[todolistId1][0].status).toBe(TaskStatus.Completed)
})

test('correct list of task should update the title', () => {
  const endState = tasksReducer(
    startState,
    updateTitleTaskTC.fulfilled(
      { todoListId: todolistId1, taskId: startState[todolistId1][0].id, changeItem: 'aaa' },
      '',
      { todoListId: todolistId1, taskId: startState[todolistId1][0].id, changeItem: 'aaa' },
    ),
  )

  expect(endState[todolistId1].length).toBe(3)
  expect(endState[todolistId1][0].title).toBe('aaa')
})

test('array should be created for new todolist', () => {
  const endState = tasksReducer(startState, createNewTodolistAC('new todolist'))

  const keys = Object.keys(endState)
  const newKey = keys.find((k) => k !== todolistId1 && k !== todolistId2)
  if (!newKey) {
    throw Error('New key should be added')
  }

  expect(keys.length).toBe(3)
  expect(endState[newKey]).toEqual([])
})

test('property with todolistId should be deleted', () => {
  const endState = tasksReducer(startState, removeTodolistAC({ todolistId: todolistId2 }))

  const keys = Object.keys(endState)

  expect(keys.length).toBe(1)
  expect(endState[todolistId2]).not.toBeDefined()
  // or
  expect(endState[todolistId2]).toBeUndefined()
})
