import { test, expect, beforeEach } from 'vitest'
import {
  createNewTodolistTC,
  removeTodolistTC,
  todolistsReducer,
  updateFilterTodolistAC,
  updateTitleTodolistTC,
} from '../todolists-slice'
import { nanoid } from '@reduxjs/toolkit'
import { DomainTodolist } from '../../api/todolistsApi.types'

let todolistId1: string
let todolistId2: string
let startState: DomainTodolist[] = []

beforeEach(() => {
  todolistId1 = nanoid()
  todolistId2 = nanoid()

  // 1. Стартовый state
  startState = [
    { id: todolistId1, title: 'What to learn', filter: 'all', addedDate: '', order: 0, entityStatus: 'idle' },
    { id: todolistId2, title: 'What to improve', filter: 'all', addedDate: '', order: 0, entityStatus: 'idle' },
  ]
})

test('correct todolist should be removed', () => {
  const endState = todolistsReducer(
    startState,
    removeTodolistTC.fulfilled({ todoListId: todolistId1 }, 'requestId', { todoListId: todolistId1 }),
  )
  expect(endState.length).toBe(1)
  expect(endState[0].id).toBe(todolistId2)
})

test('correct todolist should have the new result', () => {
  const newTodolist = {
    id: nanoid(),
    title: 'new title',
    filter: 'all',
    addedDate: '',
    order: 0,
    entityStatus: 'idle',
  }
  // createNewTodolistTC.fulfilled(
  // newTodolist:  что возвращает thunk при успехе,
  // '': уникальный ID запроса (можно передать пустую строку в тестах),
  // 'new title': аргументы, с которыми был вызван thunk
  //  )
  const endState = todolistsReducer(startState, createNewTodolistTC.fulfilled(newTodolist, 'requestId', 'new title'))
  expect(endState.length).toBe(3)
  expect(endState[0].title).toBe('new title')
  expect(endState[0].entityStatus).toBe('idle')
})

test('correct todolist should change filter to complete', () => {
  const endState = todolistsReducer(
    startState,
    updateFilterTodolistAC({ todolistId: todolistId1, filter: 'completed' }),
  )
  expect(endState.length).toBe(2)
  expect(endState[0].filter).toBe('completed')
  expect(endState[1].filter).toBe('all')
})

test('correct todolist should update the name of the todolist', () => {
  // 2. Действие
  const endState = todolistsReducer(
    startState,
    updateTitleTodolistTC.fulfilled({ id: todolistId2, title: 'What to use' }, 'requestId', {
      id: todolistId2,
      title: 'What to use',
    }),
  )
  expect(endState.length).toBe(2)
  expect(endState[1].title).toBe('What to use')
  expect(endState[1].id).toBe(todolistId2)
})
